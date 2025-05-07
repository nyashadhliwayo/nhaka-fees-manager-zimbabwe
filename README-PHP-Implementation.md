
# Nhaka School Fees Management System - PHP Implementation Guide

This document provides a comprehensive guide for implementing the Nhaka School Fees Management System in PHP and MySQL. Each page, functionality, and database structure is explained in detail to facilitate a smooth development process.

## Table of Contents
1. [Database Design](#database-design)
2. [System Overview](#system-overview)
3. [Page-by-Page Implementation](#page-by-page-implementation)
   - [Login Page](#login-page)
   - [Dashboard](#dashboard)
   - [All Students](#all-students)
   - [Add Student](#add-student)
   - [Student Payment](#student-payment)
   - [Fee Structure](#fee-structure)
   - [Term Management](#term-management)
   - [Reports](#reports)
   - [User Management](#user-management)
4. [Common Functions](#common-functions)
5. [Security Considerations](#security-considerations)
6. [Error Handling](#error-handling)

## Database Design

Below is the complete database schema for the Nhaka School Fees Management System:

```sql
-- Database: nhaka_school_fees

-- Table: students
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    class VARCHAR(50),
    section VARCHAR(50),
    address TEXT,
    phone_number VARCHAR(20),
    email VARCHAR(255),
    guardian_name VARCHAR(255),
    guardian_relationship VARCHAR(50),
    guardian_phone VARCHAR(20),
    guardian_email VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: fees
CREATE TABLE fees (
    fee_id INT AUTO_INCREMENT PRIMARY KEY,
    fee_name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency ENUM('USD', 'ZWL') NOT NULL DEFAULT 'USD',
    frequency ENUM('per_term', 'annual', 'once_off') NOT NULL,
    applies_to VARCHAR(255) COMMENT 'Class levels this fee applies to',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: terms
CREATE TABLE terms (
    term_id INT AUTO_INCREMENT PRIMARY KEY,
    term_name VARCHAR(255) NOT NULL, -- e.g., "Term 1 2025"
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    year INT NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: student_fees (for fee obligations)
CREATE TABLE student_fees (
    student_fee_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    fee_id INT NOT NULL,
    term_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    due_date DATE,
    status ENUM('pending', 'partial', 'paid') DEFAULT 'pending',
    arrears_amount DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (fee_id) REFERENCES fees(fee_id) ON DELETE CASCADE,
    FOREIGN KEY (term_id) REFERENCES terms(term_id) ON DELETE CASCADE
);

-- Table: payments
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    term_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency ENUM('USD', 'ZWL') NOT NULL DEFAULT 'USD',
    payment_date DATE NOT NULL,
    payment_method ENUM('cash', 'bank_transfer', 'mobile_money', 'other') NOT NULL,
    receipt_number VARCHAR(50),
    notes TEXT,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (term_id) REFERENCES terms(term_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(user_id)
);

-- Table: payment_details
CREATE TABLE payment_details (
    payment_detail_id INT AUTO_INCREMENT PRIMARY KEY,
    payment_id INT NOT NULL,
    fee_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payment_id) REFERENCES payments(payment_id) ON DELETE CASCADE,
    FOREIGN KEY (fee_id) REFERENCES fees(fee_id) ON DELETE CASCADE
);

-- Table: classes
CREATE TABLE classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: sections
CREATE TABLE sections (
    section_id INT AUTO_INCREMENT PRIMARY KEY,
    section_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Store hashed passwords
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role ENUM('admin', 'bursar', 'clerk', 'teacher') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: system_settings
CREATE TABLE system_settings (
    setting_id INT AUTO_INCREMENT PRIMARY KEY,
    setting_name VARCHAR(255) NOT NULL UNIQUE,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: audit_log
CREATE TABLE audit_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255) NOT NULL,
    table_name VARCHAR(255),
    record_id INT,
    old_values TEXT,
    new_values TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);
```

## System Overview

The Nhaka School Fees Management System is designed to track student information, fee structures, payments, and generate reports. The system features different user roles with varied permissions:

1. **Admin**: Full access to all system features
2. **Bursar**: Manage payments, fees, and financial reports
3. **Clerk**: Add/edit student info, record payments
4. **Teacher**: View student info with limited access

### Core Features:

- Student registration and management
- Fee structure configuration
- Payment recording and tracking
- Term/semester management
- Financial reports generation
- User management

## Page-by-Page Implementation

### Login Page

**File:** `login.php`

**Description:** Authentication gateway for users. Validates credentials against the database and redirects to the dashboard if successful.

**PHP Implementation:**

```php
<?php
session_start();
require_once 'includes/db_connection.php';
require_once 'includes/functions.php';

// Check if user is already logged in
if (isset($_SESSION['user_id'])) {
    header("Location: dashboard.php");
    exit();
}

$error_message = "";

// Handle login form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = sanitize_input($_POST['username']);
    $password = $_POST['password'];
    
    if (empty($username) || empty($password)) {
        $error_message = "All fields are required";
    } else {
        // Query the database
        $sql = "SELECT * FROM users WHERE username = ? AND is_active = 1 LIMIT 1";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            
            // Verify password
            if (password_verify($password, $user['password'])) {
                // Password is correct, create session
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['role'] = $user['role'];
                $_SESSION['full_name'] = $user['first_name'] . ' ' . $user['last_name'];
                
                // Update last login time
                $update_sql = "UPDATE users SET last_login = NOW() WHERE user_id = ?";
                $update_stmt = $conn->prepare($update_sql);
                $update_stmt->bind_param("i", $user['user_id']);
                $update_stmt->execute();
                
                // Log the action
                log_action($conn, $user['user_id'], 'login', 'users', $user['user_id'], null, null);
                
                header("Location: dashboard.php");
                exit();
            } else {
                $error_message = "Invalid username or password";
            }
        } else {
            $error_message = "Invalid username or password";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Nhaka School Fees Management</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body class="login-page">
    <div class="login-container">
        <div class="login-logo">
            <img src="images/logo.png" alt="Nhaka School Logo">
        </div>
        <h1>Nhaka School Fees Management</h1>
        
        <?php if (!empty($error_message)): ?>
            <div class="alert alert-danger"><?php echo $error_message; ?></div>
        <?php endif; ?>
        
        <form action="login.php" method="post">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <button type="submit" class="btn btn-primary btn-block">Login</button>
        </form>
        
        <div class="login-footer">
            <p>&copy; <?php echo date('Y'); ?> Nhaka School. All rights reserved.</p>
        </div>
    </div>

    <script src="js/script.js"></script>
</body>
</html>
```

**Required Helper Files:**
- `includes/db_connection.php`: Database connection setup
- `includes/functions.php`: Utility functions including sanitization, logging, etc.

### Dashboard

**File:** `dashboard.php`

**Description:** The main landing page after login. Displays summary statistics, quick links, and recent activities.

**PHP Implementation:**

```php
<?php
session_start();
require_once 'includes/db_connection.php';
require_once 'includes/functions.php';
require_once 'includes/auth_check.php';

// Get current term
$current_term_query = "SELECT * FROM terms WHERE is_current = 1 LIMIT 1";
$current_term_result = $conn->query($current_term_query);
$current_term = $current_term_result->fetch_assoc();

// Get total students
$total_students_query = "SELECT COUNT(*) AS total FROM students";
$total_students_result = $conn->query($total_students_query);
$total_students = $total_students_result->fetch_assoc()['total'];

// Get financial summary for current term
$financial_summary = array(
    'total_expected' => 0,
    'total_collected' => 0,
    'total_arrears' => 0
);

if ($current_term) {
    // Get total fees expected
    $expected_query = "SELECT SUM(amount) AS total FROM student_fees WHERE term_id = ?";
    $stmt = $conn->prepare($expected_query);
    $stmt->bind_param("i", $current_term['term_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $financial_summary['total_expected'] = $result->fetch_assoc()['total'] ?: 0;
    
    // Get total collected
    $collected_query = "SELECT SUM(amount) AS total FROM payments WHERE term_id = ?";
    $stmt = $conn->prepare($collected_query);
    $stmt->bind_param("i", $current_term['term_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $financial_summary['total_collected'] = $result->fetch_assoc()['total'] ?: 0;
    
    // Calculate arrears
    $financial_summary['total_arrears'] = $financial_summary['total_expected'] - $financial_summary['total_collected'];
}

// Get recent payments
$recent_payments_query = "
    SELECT p.payment_id, p.amount, p.payment_date, p.payment_method, 
           s.first_name, s.last_name, s.class, s.section
    FROM payments p
    JOIN students s ON p.student_id = s.student_id
    ORDER BY p.payment_date DESC
    LIMIT 5
";
$recent_payments_result = $conn->query($recent_payments_query);

// Get students with outstanding fees
$arrears_query = "
    SELECT s.student_id, s.first_name, s.last_name, s.class, s.section,
           SUM(sf.amount) - COALESCE(
               (SELECT SUM(p.amount) FROM payments p WHERE p.student_id = s.student_id AND p.term_id = sf.term_id),
               0
           ) AS arrears_amount
    FROM students s
    JOIN student_fees sf ON s.student_id = sf.student_id
    WHERE sf.term_id = ? AND sf.status != 'paid'
    GROUP BY s.student_id
    HAVING arrears_amount > 0
    ORDER BY arrears_amount DESC
    LIMIT 5
";
$stmt = $conn->prepare($arrears_query);
$stmt->bind_param("i", $current_term['term_id']);
$stmt->execute();
$arrears_result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Nhaka School Fees Management</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <div class="container">
        <?php include 'includes/sidebar.php'; ?>
        
        <main class="content">
            <h1>Dashboard</h1>
            
            <?php if ($current_term): ?>
                <div class="current-term-info">
                    <h2>Current Term: <?php echo htmlspecialchars($current_term['term_name']); ?></h2>
                    <p>
                        <?php echo date('d M Y', strtotime($current_term['start_date'])); ?> - 
                        <?php echo date('d M Y', strtotime($current_term['end_date'])); ?>
                    </p>
                </div>
            <?php else: ?>
                <div class="alert alert-warning">
                    <strong>Warning:</strong> No active term set. Please set a current term in Term Management.
                </div>
            <?php endif; ?>
            
            <div class="stats-cards">
                <div class="card">
                    <div class="card-icon students-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="card-content">
                        <h3>Total Students</h3>
                        <p class="large-number"><?php echo number_format($total_students); ?></p>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-icon fees-expected-icon">
                        <i class="fas fa-money-bill"></i>
                    </div>
                    <div class="card-content">
                        <h3>Total Expected Fees</h3>
                        <p class="large-number">$<?php echo number_format($financial_summary['total_expected'], 2); ?></p>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-icon fees-collected-icon">
                        <i class="fas fa-hand-holding-usd"></i>
                    </div>
                    <div class="card-content">
                        <h3>Total Collected</h3>
                        <p class="large-number">$<?php echo number_format($financial_summary['total_collected'], 2); ?></p>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-icon arrears-icon">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    <div class="card-content">
                        <h3>Total Arrears</h3>
                        <p class="large-number">$<?php echo number_format($financial_summary['total_arrears'], 2); ?></p>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-sections">
                <div class="section">
                    <h2>Recent Payments</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if ($recent_payments_result->num_rows > 0): ?>
                                <?php while ($payment = $recent_payments_result->fetch_assoc()): ?>
                                    <tr>
                                        <td><?php echo htmlspecialchars($payment['first_name'] . ' ' . $payment['last_name']); ?></td>
                                        <td>$<?php echo number_format($payment['amount'], 2); ?></td>
                                        <td><?php echo date('d M Y', strtotime($payment['payment_date'])); ?></td>
                                        <td><?php echo ucfirst(str_replace('_', ' ', $payment['payment_method'])); ?></td>
                                    </tr>
                                <?php endwhile; ?>
                            <?php else: ?>
                                <tr>
                                    <td colspan="4" class="text-center">No recent payments.</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                    <a href="payments.php" class="btn btn-sm">View All Payments</a>
                </div>
                
                <div class="section">
                    <h2>Outstanding Fees</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Class</th>
                                <th>Section</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if ($arrears_result->num_rows > 0): ?>
                                <?php while ($arrear = $arrears_result->fetch_assoc()): ?>
                                    <tr>
                                        <td><?php echo htmlspecialchars($arrear['first_name'] . ' ' . $arrear['last_name']); ?></td>
                                        <td><?php echo htmlspecialchars($arrear['class']); ?></td>
                                        <td><?php echo htmlspecialchars($arrear['section']); ?></td>
                                        <td>$<?php echo number_format($arrear['arrears_amount'], 2); ?></td>
                                    </tr>
                                <?php endwhile; ?>
                            <?php else: ?>
                                <tr>
                                    <td colspan="4" class="text-center">No outstanding fees.</td>
                                </tr>
                            <?php endif; ?>
                        </tbody>
                    </table>
                    <a href="students.php?filter=arrears" class="btn btn-sm">View All Students with Arrears</a>
                </div>
            </div>
        </main>
    </div>
    
    <?php include 'includes/footer.php'; ?>
    
    <script src="js/script.js"></script>
</body>
</html>
```

**Required Helper Files:**
- `includes/header.php`: Common header with navigation
- `includes/sidebar.php`: Sidebar navigation menu
- `includes/footer.php`: Common footer
- `includes/auth_check.php`: Authentication verification

### All Students

**File:** `all_students.php`

**Description:** Displays a list of all students with filtering and search functionality.

**PHP Implementation:**

```php
<?php
session_start();
require_once 'includes/db_connection.php';
require_once 'includes/functions.php';
require_once 'includes/auth_check.php';

// Initialize filters with default values
$filters = array(
    'search' => '',
    'class' => '',
    'section' => '',
    'fees_status' => '',
    'arrears' => ''
);

// Process filter values if submitted
foreach ($filters as $key => $value) {
    if (isset($_GET[$key])) {
        $filters[$key] = sanitize_input($_GET[$key]);
    }
}

// Build the query based on filters
$query = "
    SELECT s.*, 
        (SELECT status FROM student_fees sf 
         JOIN terms t ON sf.term_id = t.term_id 
         WHERE sf.student_id = s.student_id AND t.is_current = 1 
         LIMIT 1) AS fees_status,
        (SELECT SUM(sf.amount) - COALESCE(
            (SELECT SUM(p.amount) FROM payments p 
             JOIN terms t ON p.term_id = t.term_id 
             WHERE p.student_id = s.student_id AND t.is_current = 1), 
            0) 
         FROM student_fees sf 
         JOIN terms t ON sf.term_id = t.term_id 
         WHERE sf.student_id = s.student_id AND t.is_current = 1) AS arrears_amount
    FROM students s
    WHERE 1=1
";

// Add search conditions
if (!empty($filters['search'])) {
    $search = "%{$filters['search']}%";
    $query .= " AND (s.first_name LIKE ? OR s.last_name LIKE ? OR s.student_id LIKE ? OR s.email LIKE ?)";
    $param_types[] = "ssss";
    $params[] = $search;
    $params[] = $search;
    $params[] = $search;
    $params[] = $search;
}

// Add class filter
if (!empty($filters['class']) && $filters['class'] != 'all-classes') {
    $query .= " AND s.class = ?";
    $param_types[] = "s";
    $params[] = $filters['class'];
}

// Add section filter
if (!empty($filters['section']) && $filters['section'] != 'all-sections') {
    $query .= " AND s.section = ?";
    $param_types[] = "s";
    $params[] = $filters['section'];
}

// Fees status handling requires a subquery with HAVING clause
if (!empty($filters['fees_status']) && $filters['fees_status'] != 'all-statuses') {
    $query .= " HAVING fees_status = ?";
    $param_types[] = "s";
    $params[] = $filters['fees_status'];
}

// Arrears filter needs special handling
if (!empty($filters['arrears'])) {
    if ($filters['arrears'] == 'with') {
        $query .= " HAVING arrears_amount > 0";
    } elseif ($filters['arrears'] == 'without') {
        $query .= " HAVING arrears_amount IS NULL OR arrears_amount <= 0";
    }
}

// Order by
$query .= " ORDER BY s.last_name, s.first_name";

// Prepare and execute the statement
$param_type_string = isset($param_types) ? implode('', $param_types) : "";
$stmt = $conn->prepare($query);

if (!empty($params)) {
    $stmt->bind_param($param_type_string, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

// Get distinct classes and sections for filters
$classes_query = "SELECT DISTINCT class FROM students WHERE class IS NOT NULL AND class != '' ORDER BY class";
$classes_result = $conn->query($classes_query);

$sections_query = "SELECT DISTINCT section FROM students WHERE section IS NOT NULL AND section != '' ORDER BY section";
$sections_result = $conn->query($sections_query);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Students - Nhaka School Fees Management</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <div class="container">
        <?php include 'includes/sidebar.php'; ?>
        
        <main class="content">
            <div class="page-header">
                <h1>All Students</h1>
                <a href="add_student.php" class="btn btn-primary">Add New Student</a>
            </div>
            
            <div class="filter-container">
                <h3><i class="fas fa-filter"></i> Filters</h3>
                
                <form action="all_students.php" method="get" class="filter-form">
                    <div class="filter-grid">
                        <div class="form-group">
                            <label for="search">Search</label>
                            <input type="text" id="search" name="search" placeholder="ID, Name, Email..." 
                                value="<?php echo htmlspecialchars($filters['search']); ?>">
                        </div>
                        
                        <div class="form-group">
                            <label for="class">Class</label>
                            <select id="class" name="class">
                                <option value="all-classes">All Classes</option>
                                <?php while ($class = $classes_result->fetch_assoc()): ?>
                                    <option value="<?php echo htmlspecialchars($class['class']); ?>"
                                        <?php if ($filters['class'] == $class['class']) echo 'selected'; ?>>
                                        Class <?php echo htmlspecialchars($class['class']); ?>
                                    </option>
                                <?php endwhile; ?>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="section">Section</label>
                            <select id="section" name="section">
                                <option value="all-sections">All Sections</option>
                                <?php while ($section = $sections_result->fetch_assoc()): ?>
                                    <option value="<?php echo htmlspecialchars($section['section']); ?>"
                                        <?php if ($filters['section'] == $section['section']) echo 'selected'; ?>>
                                        Section <?php echo htmlspecialchars($section['section']); ?>
                                    </option>
                                <?php endwhile; ?>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="fees_status">Payment Status</label>
                            <select id="fees_status" name="fees_status">
                                <option value="all-statuses">All Statuses</option>
                                <option value="paid" <?php if ($filters['fees_status'] == 'paid') echo 'selected'; ?>>Paid</option>
                                <option value="partial" <?php if ($filters['fees_status'] == 'partial') echo 'selected'; ?>>Partial</option>
                                <option value="pending" <?php if ($filters['fees_status'] == 'pending') echo 'selected'; ?>>Pending</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="arrears">Arrears</label>
                            <select id="arrears" name="arrears">
                                <option value="all-arrears">All Students</option>
                                <option value="with" <?php if ($filters['arrears'] == 'with') echo 'selected'; ?>>With Arrears</option>
                                <option value="without" <?php if ($filters['arrears'] == 'without') echo 'selected'; ?>>No Arrears</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="filter-actions">
                        <button type="reset" class="btn btn-outline" onclick="window.location='all_students.php'">Reset Filters</button>
                        <button type="submit" class="btn btn-primary">Apply Filters</button>
                    </div>
                </form>
            </div>
            
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Parent's Name</th>
                            <th>Class</th>
                            <th>Section</th>
                            <th>Address</th>
                            <th>DOB</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Fees Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if ($result->num_rows > 0): ?>
                            <?php while ($student = $result->fetch_assoc()): ?>
                                <tr>
                                    <td>#<?php echo htmlspecialchars($student['student_id']); ?></td>
                                    <td class="student-photo">
                                        <div class="avatar">
                                            <?php echo strtoupper(substr($student['first_name'], 0, 1)); ?>
                                        </div>
                                    </td>
                                    <td><?php echo htmlspecialchars($student['first_name'] . ' ' . $student['last_name']); ?></td>
                                    <td><?php echo htmlspecialchars(ucfirst($student['gender'])); ?></td>
                                    <td><?php echo htmlspecialchars($student['guardian_name']); ?></td>
                                    <td><?php echo htmlspecialchars($student['class']); ?></td>
                                    <td><?php echo htmlspecialchars($student['section']); ?></td>
                                    <td><?php echo htmlspecialchars($student['address']); ?></td>
                                    <td><?php echo $student['date_of_birth'] ? date('d/m/Y', strtotime($student['date_of_birth'])) : ''; ?></td>
                                    <td><?php echo htmlspecialchars($student['phone_number']); ?></td>
                                    <td><?php echo htmlspecialchars($student['email']); ?></td>
                                    <td>
                                        <?php 
                                            $status_class = '';
                                            $status_text = $student['fees_status'] ?? 'Unknown';
                                            
                                            if ($status_text == 'paid') {
                                                $status_class = 'status-paid';
                                            } elseif ($status_text == 'partial') {
                                                $status_class = 'status-partial';
                                            } elseif ($status_text == 'pending') {
                                                $status_class = 'status-pending';
                                            }
                                            
                                            echo '<span class="status-badge ' . $status_class . '">' . ucfirst($status_text) . '</span>';
                                            
                                            if ($student['arrears_amount'] > 0) {
                                                echo ' <span class="arrears-amount">($' . number_format($student['arrears_amount'], 2) . ')</span>';
                                            }
                                        ?>
                                    </td>
                                    <td class="actions">
                                        <a href="edit_student.php?id=<?php echo $student['student_id']; ?>" class="btn-icon edit-icon" title="Edit">
                                            <i class="fas fa-edit"></i>
                                        </a>
                                        <a href="#" class="btn-icon delete-icon" title="Delete" 
                                           onclick="confirmDelete(<?php echo $student['student_id']; ?>, '<?php echo htmlspecialchars($student['first_name'] . ' ' . $student['last_name']); ?>')">
                                            <i class="fas fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                            <?php endwhile; ?>
                        <?php else: ?>
                            <tr>
                                <td colspan="13" class="text-center">No students found matching the selected filters.</td>
                            </tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
    
    <?php include 'includes/footer.php'; ?>
    
    <script src="js/script.js"></script>
    <script>
        function confirmDelete(studentId, studentName) {
            if (confirm(`Are you sure you want to delete ${studentName}?`)) {
                window.location.href = `delete_student.php?id=${studentId}&csrf_token=<?php echo $_SESSION['csrf_token']; ?>`;
            }
        }
    </script>
</body>
</html>
```

### Add Student

**File:** `add_student.php`

**Description:** Form for adding a new student to the database.

**PHP Implementation:**

```php
<?php
session_start();
require_once 'includes/db_connection.php';
require_once 'includes/functions.php';
require_once 'includes/auth_check.php';

$success_message = '';
$error_message = '';

// Get classes and sections for dropdown
$classes_query = "SELECT DISTINCT class_name FROM classes ORDER BY class_name";
$classes_result = $conn->query($classes_query);

$sections_query = "SELECT DISTINCT section_name FROM sections ORDER BY section_name";
$sections_result = $conn->query($sections_query);

// Get current term for fees setup
$current_term_query = "SELECT * FROM terms WHERE is_current = 1 LIMIT 1";
$current_term_result = $conn->query($current_term_query);
$current_term = $current_term_result->fetch_assoc();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validate and sanitize input data
    $first_name = sanitize_input($_POST['firstName']);
    $last_name = sanitize_input($_POST['lastName']);
    $gender = sanitize_input($_POST['gender']);
    $date_of_birth = !empty($_POST['dob']) ? $_POST['dob'] : null;
    $class = sanitize_input($_POST['class']);
    $section = sanitize_input($_POST['section']);
    $address = sanitize_input($_POST['address']);
    $phone_number = sanitize_input($_POST['mobile']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $guardian_name = sanitize_input($_POST['guardianName']);
    $guardian_relationship = sanitize_input($_POST['relationship']);
    $guardian_phone = sanitize_input($_POST['guardianMobile']);
    $guardian_email = filter_var($_POST['guardianEmail'], FILTER_SANITIZE_EMAIL);
    $fees_status = sanitize_input($_POST['feesStatus']);
    $initial_payment = !empty($_POST['initialPayment']) ? floatval($_POST['initialPayment']) : 0;
    $notes = sanitize_input($_POST['notes']);

    // Basic validation
    $validation_errors = array();
    
    if (empty($first_name)) $validation_errors[] = "First name is required.";
    if (empty($last_name)) $validation_errors[] = "Last name is required.";
    if (empty($class)) $validation_errors[] = "Class is required.";
    
    // Email validation if provided
    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Invalid student email format.";
    }
    
    if (!empty($guardian_email) && !filter_var($guardian_email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Invalid guardian email format.";
    }

    if (empty($validation_errors)) {
        // Start transaction
        $conn->begin_transaction();
        
        try {
            // Insert student data
            $insert_query = "
                INSERT INTO students (
                    first_name, last_name, date_of_birth, gender, class, section,
                    address, phone_number, email, guardian_name, guardian_relationship,
                    guardian_phone, guardian_email, notes
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ";
            
            $stmt = $conn->prepare($insert_query);
            $stmt->bind_param(
                "sssssssssssss", 
                $first_name, $last_name, $date_of_birth, $gender, $class, $section,
                $address, $phone_number, $email, $guardian_name, $guardian_relationship,
                $guardian_phone, $guardian_email, $notes
            );
            $stmt->execute();
            
            $student_id = $conn->insert_id;
            
            // If current term exists, create fee records
            if ($current_term) {
                // Get all applicable fees for the class
                $fees_query = "SELECT * FROM fees WHERE applies_to LIKE ? OR applies_to = 'all'";
                $stmt = $conn->prepare($fees_query);
                $class_pattern = "%{$class}%";
                $stmt->bind_param("s", $class_pattern);
                $stmt->execute();
                $fees_result = $stmt->get_result();
                
                $total_fees = 0;
                
                // Create fee records for this student
                while ($fee = $fees_result->fetch_assoc()) {
                    $fee_insert_query = "
                        INSERT INTO student_fees (
                            student_id, fee_id, term_id, amount, due_date, status
                        ) VALUES (?, ?, ?, ?, ?, ?)
                    ";
                    
                    $due_date = $current_term['start_date']; // Default due date is term start
                    $stmt = $conn->prepare($fee_insert_query);
                    $stmt->bind_param(
                        "iiidss",
                        $student_id, $fee['fee_id'], $current_term['term_id'],
                        $fee['amount'], $due_date, $fees_status
                    );
                    $stmt->execute();
                    
                    $total_fees += $fee['amount'];
                }
                
                // If initial payment is provided, record the payment
                if ($initial_payment > 0) {
                    $payment_insert_query = "
                        INSERT INTO payments (
                            student_id, term_id, amount, currency, payment_date,
                            payment_method, notes, created_by
                        ) VALUES (?, ?, ?, 'USD', CURDATE(), 'cash', 'Initial payment at registration', ?)
                    ";
                    
                    $stmt = $conn->prepare($payment_insert_query);
                    $stmt->bind_param(
                        "iidi",
                        $student_id, $current_term['term_id'], $initial_payment, $_SESSION['user_id']
                    );
                    $stmt->execute();
                    
                    $payment_id = $conn->insert_id;
                    
                    // Update student fees status based on payment
                    if ($initial_payment >= $total_fees) {
                        // Fully paid
                        $update_query = "
                            UPDATE student_fees 
                            SET status = 'paid', arrears_amount = 0
                            WHERE student_id = ? AND term_id = ?
                        ";
                    } else {
                        // Partially paid
                        $arrears = $total_fees - $initial_payment;
                        $update_query = "
                            UPDATE student_fees 
                            SET status = 'partial', arrears_amount = ?
                            WHERE student_id = ? AND term_id = ?
                        ";
                        $stmt = $conn->prepare($update_query);
                        $stmt->bind_param("dii", $arrears, $student_id, $current_term['term_id']);
                        $stmt->execute();
                    }
                }
            }
            
            // Log the action
            log_action($conn, $_SESSION['user_id'], 'create', 'students', $student_id, null, 'Added new student');
            
            // Commit transaction
            $conn->commit();
            
            $success_message = "Student added successfully!";
            
            // Optionally redirect to the student list or stay on the form for another entry
            // header("Location: all_students.php");
            // exit();
            
        } catch (Exception $e) {
            $conn->rollback();
            $error_message = "Error: " . $e->getMessage();
        }
    } else {
        $error_message = "Please correct the following errors:<br>• " . implode("<br>• ", $validation_errors);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Student - Nhaka School Fees Management</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <div class="container">
        <?php include 'includes/sidebar.php'; ?>
        
        <main class="content">
            <div class="page-header">
                <h1>Add New Student</h1>
                <button onclick="window.history.back()" class="btn btn-outline">Back</button>
            </div>
            
            <?php if ($success_message): ?>
                <div class="alert alert-success"><?php echo $success_message; ?></div>
            <?php endif; ?>
            
            <?php if ($error_message): ?>
                <div class="alert alert-danger"><?php echo $error_message; ?></div>
            <?php endif; ?>
            
            <div class="card">
                <div class="card-header">
                    <h2><i class="fas fa-user-plus"></i> Student Information</h2>
                </div>
                <div class="card-body">
                    <form action="add_student.php" method="post">
                        <!-- Personal Information -->
                        <div class="form-section">
                            <h3>Personal Information</h3>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="firstName">First Name*</label>
                                    <input type="text" id="firstName" name="firstName" required>
                                </div>
                                
                                <div class="form-group">
                                    <label for="lastName">Last Name*</label>
                                    <input type="text" id="lastName" name="lastName" required>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="gender">Gender</label>
                                    <select id="gender" name="gender">
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="dob">Date of Birth</label>
                                    <input type="date" id="dob" name="dob">
                                </div>
                                
                                <div class="form-group">
                                    <label for="studentId">Student ID</label>
                                    <input type="text" id="studentId" placeholder="Auto-generated" disabled>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Academic Information -->
                        <div class="form-section">
                            <h3>Academic Information</h3>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="class">Class*</label>
                                    <select id="class" name="class" required>
                                        <option value="">Select Class</option>
                                        <?php while ($class = $classes_result->fetch_assoc()): ?>
                                            <option value="<?php echo htmlspecialchars($class['class_name']); ?>">
                                                Class <?php echo htmlspecialchars($class['class_name']); ?>
                                            </option>
                                        <?php endwhile; ?>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="section">Section</label>
                                    <select id="section" name="section">
                                        <option value="">Select Section</option>
                                        <?php while ($section = $sections_result->fetch_assoc()): ?>
                                            <option value="<?php echo htmlspecialchars($section['section_name']); ?>">
                                                Section <?php echo htmlspecialchars($section['section_name']); ?>
                                            </option>
                                        <?php endwhile; ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Contact Information -->
                        <div class="form-section">
                            <h3>Contact Information</h3>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <textarea id="address" name="address" rows="3"></textarea>
                                </div>
                                
                                <div class="form-group-column">
                                    <div class="form-group">
                                        <label for="mobile">Mobile Number</label>
                                        <input type="tel" id="mobile" name="mobile">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="email">Email Address</label>
                                        <input type="email" id="email" name="email">
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Guardian Information -->
                        <div class="form-section">
                            <h3>Parent/Guardian Information</h3>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="guardianName">Full Name</label>
                                    <input type="text" id="guardianName" name="guardianName">
                                </div>
                                
                                <div class="form-group">
                                    <label for="relationship">Relationship</label>
                                    <select id="relationship" name="relationship">
                                        <option value="">Select Relationship</option>
                                        <option value="father">Father</option>
                                        <option value="mother">Mother</option>
                                        <option value="guardian">Guardian</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="guardianMobile">Mobile Number</label>
                                    <input type="tel" id="guardianMobile" name="guardianMobile">
                                </div>
                                
                                <div class="form-group">
                                    <label for="guardianEmail">Email Address</label>
                                    <input type="email" id="guardianEmail" name="guardianEmail">
                                </div>
                            </div>
                        </div>
                        
                        <!-- Fees Initial Setup -->
                        <div class="form-section">
                            <h3>Fees Information</h3>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="feesStatus">Initial Fees Status</label>
                                    <select id="feesStatus" name="feesStatus">
                                        <option value="pending">Pending</option>
                                        <option value="partial">Partial</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <label for="initialPayment">Initial Payment Amount ($)</label>
                                    <input type="number" id="initialPayment" name="initialPayment" min="0" step="0.01" value="0.00">
                                </div>
                            </div>
                            
                            <div class="form-group checkbox-group">
                                <input type="checkbox" id="confirmFees" name="confirmFees">
                                <label for="confirmFees">I confirm the fees information is correct</label>
                            </div>
                        </div>
                        
                        <!-- Notes -->
                        <div class="form-section">
                            <div class="form-group">
                                <label for="notes">Additional Notes</label>
                                <textarea id="notes" name="notes" rows="3"></textarea>
                            </div>
                        </div>
                        
                        <!-- Submit buttons -->
                        <div class="form-actions">
                            <button type="button" class="btn btn-outline" onclick="window.history.back()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Add Student</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
    
    <?php include 'includes/footer.php'; ?>
    
    <script src="js/script.js"></script>
</body>
</html>
```

### Student Payment

**File:** `student_payment.php`

**Description:** Records a new payment for a student. Includes student selection, payment details entry, and receipt generation.

**PHP Implementation:**

```php
<?php
session_start();
require_once 'includes/db_connection.php';
require_once 'includes/functions.php';
require_once 'includes/auth_check.php';

// Get current term
$current_term_query = "SELECT * FROM terms WHERE is_current = 1 LIMIT 1";
$current_term_result = $conn->query($current_term_query);
$current_term = $current_term_result->fetch_assoc();

$success_message = '';
$error_message = '';
$student = null;
$fees = [];
$total_due = 0;
$total_paid = 0;
$balance = 0;

// Handle student search
if (isset($_GET['student_search']) && !empty($_GET['student_search'])) {
    $search = "%{$_GET['student_search']}%";
    
    $search_query = "
        SELECT * FROM students
        WHERE (first_name LIKE ? OR last_name LIKE ? OR student_id LIKE ?)
        LIMIT 1
    ";
    
    $stmt = $conn->prepare($search_query);
    $stmt->bind_param("sss", $search, $search, $search);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $student = $result->fetch_assoc();
        
        if ($current_term) {
            // Get all fees for this student in current term
            $fees_query = "
                SELECT sf.*, f.fee_name 
                FROM student_fees sf
                JOIN fees f ON sf.fee_id = f.fee_id
                WHERE sf.student_id = ? AND sf.term_id = ?
            ";
            
            $stmt = $conn->prepare($fees_query);
            $stmt->bind_param("ii", $student['student_id'], $current_term['term_id']);
            $stmt->execute();
            $fees_result = $stmt->get_result();
            
            while ($fee = $fees_result->fetch_assoc()) {
                $fees[] = $fee;
                $total_due += $fee['amount'];
            }
            
            // Get payments already made
            $payments_query = "
                SELECT SUM(amount) AS total 
                FROM payments 
                WHERE student_id = ? AND term_id = ?
            ";
            
            $stmt = $conn->prepare($payments_query);
            $stmt->bind_param("ii", $student['student_id'], $current_term['term_id']);
            $stmt->execute();
            $payments_result = $stmt->get_result();
            $payments = $payments_result->fetch_assoc();
            
            $total_paid = $payments['total'] ?: 0;
            $balance = $total_due - $total_paid;
        } else {
            $error_message = "No active term found. Please set a current term.";
        }
    } else {
        $error_message = "No student found with the provided information.";
    }
}

// Handle payment submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit_payment'])) {
    $student_id = $_POST['student_id'];
    $term_id = $_POST['term_id'];
    $amount = floatval($_POST['amount']);
    $currency = $_POST['currency'];
    $payment_date = $_POST['payment_date'] ?: date('Y-m-d');
    $payment_method = $_POST['payment_method'];
    $receipt_number = sanitize_input($_POST['receipt_number']);
    $notes = sanitize_input($_POST['notes']);
    
    // Basic validation
    $validation_errors = array();
    
    if ($amount <= 0) {
        $validation_errors[] = "Please enter a valid payment amount.";
    }
    
    if (empty($validation_errors)) {
        // Start transaction
        $conn->begin_transaction();
        
        try {
            // Insert payment
            $payment_query = "
                INSERT INTO payments (
                    student_id, term_id, amount, currency, payment_date,
                    payment_method, receipt_number, notes, created_by
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ";
            
            $stmt = $conn->prepare($payment_query);
            $stmt->bind_param(
                "iidsssssi",
                $student_id, $term_id, $amount, $currency, $payment_date,
                $payment_method, $receipt_number, $notes, $_SESSION['user_id']
            );
            $stmt->execute();
            $payment_id = $conn->insert_id;
            
            // Update student fees status
            $get_fees_query = "
                SELECT SUM(amount) AS total_due 
                FROM student_fees 
                WHERE student_id = ? AND term_id = ?
            ";
            
            $stmt = $conn->prepare($get_fees_query);
            $stmt->bind_param("ii", $student_id, $term_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $total_due = $result->fetch_assoc()['total_due'] ?: 0;
            
            $get_payments_query = "
                SELECT SUM(amount) AS total_paid 
                FROM payments 
                WHERE student_id = ? AND term_id = ?
            ";
            
            $stmt = $conn->prepare($get_payments_query);
            $stmt->bind_param("ii", $student_id, $term_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $total_paid = $result->fetch_assoc()['total_paid'] ?: 0;
            
            if ($total_paid >= $total_due) {
                // Fully paid
                $status = 'paid';
                $arrears = 0;
            } else {
                // Partially paid
                $status = 'partial';
                $arrears = $total_due - $total_paid;
            }
            
            $update_query = "
                UPDATE student_fees 
                SET status = ?, arrears_amount = ?
                WHERE student_id = ? AND term_id = ?
            ";
            
            $stmt = $conn->prepare($update_query);
            $stmt->bind_param("sdii", $status, $arrears, $student_id, $term_id);
            $stmt->execute();
            
            // Log the action
            log_action(
                $conn, 
                $_SESSION['user_id'], 
                'create', 
                'payments', 
                $payment_id, 
                null, 
                "Payment of $currency $amount recorded for student ID $student_id"
            );
            
            // Commit transaction
            $conn->commit();
            
            $success_message = "Payment recorded successfully. Receipt #" . sprintf('%06d', $payment_id);
            
            // Redirect to print receipt if requested
            if (isset($_POST['print_receipt'])) {
                header("Location: print_receipt.php?payment_id=$payment_id");
                exit();
            }
            
        } catch (Exception $e) {
            $conn->rollback();
            $error_message = "Error: " . $e->getMessage();
        }
    } else {
        $error_message = "Please correct the following errors:<br>• " . implode("<br>• ", $validation_errors);
    }
    
    // Rerun the student search to refresh the data
    if (!empty($_POST['student_search'])) {
        $_GET['student_search'] = $_POST['student_search'];
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Payment - Nhaka School Fees Management</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <div class="container">
        <?php include 'includes/sidebar.php'; ?>
        
        <main class="content">
            <div class="page-header">
                <h1>Record Student Payment</h1>
            </div>
            
            <?php if ($success_message): ?>
                <div class="alert alert-success"><?php echo $success_message; ?></div>
            <?php endif; ?>
            
            <?php if ($error_message): ?>
                <div class="alert alert-danger"><?php echo $error_message; ?></div>
            <?php endif; ?>
            
            <!-- Student Search Form -->
            <div class="card">
                <div class="card-header">
                    <h2><i class="fas fa-search"></i> Find Student</h2>
                </div>
                <div class="card-body">
                    <form action="student_payment.php" method="get" class="search-form">
                        <div class="form-group">
                            <label for="student_search">Search by ID, First Name or Last Name</label>
                            <div class="search-input-group">
                                <input type="text" id="student_search" name="student_search" 
                                    value="<?php echo isset($_GET['student_search']) ? htmlspecialchars($_GET['student_search']) : ''; ?>"
                                    placeholder="Enter ID, first name or last name...">
                                <button type="submit" class="btn btn-primary">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            <?php if ($student): ?>
                <!-- Student Information -->
                <div class="card">
                    <div class="card-header">
                        <h2><i class="fas fa-user"></i> Student Information</h2>
                    </div>
                    <div class="card-body">
                        <div class="student-info">
                            <div class="student-detail">
                                <strong>Student ID:</strong> <?php echo htmlspecialchars($student['student_id']); ?>
                            </div>
                            <div class="student-detail">
                                <strong>Name:</strong> <?php echo htmlspecialchars($student['first_name'] . ' ' . $student['last_name']); ?>
                            </div>
                            <div class="student-detail">
                                <strong>Class:</strong> <?php echo htmlspecialchars($student['class']); ?>
                            </div>
                            <div class="student-detail">
                                <strong>Section:</strong> <?php echo htmlspecialchars($student['section']); ?>
                            </div>
                        </div>
                        
                        <?php if ($current_term): ?>
                            <div class="fees-summary">
                                <div class="summary-row">
                                    <div class="summary-label">Total Fees:</div>
                                    <div class="summary-value">$<?php echo number_format($total_due, 2); ?></div>
                                </div>
                                <div class="summary-row">
                                    <div class="summary-label">Amount Paid:</div>
                                    <div class="summary-value">$<?php echo number_format($total_paid, 2); ?></div>
                                </div>
                                <div class="summary-row highlight">
                                    <div class="summary-label">Balance:</div>
                                    <div class="summary-value">$<?php echo number_format($balance, 2); ?></div>
                                </div>
                            </div>
                            
                            <?php if ($balance > 0): ?>
                                <!-- Payment Form -->
                                <form action="student_payment.php" method="post" class="payment-form">
                                    <h3>Record Payment</h3>
                                    
                                    <input type="hidden" name="student_id" value="<?php echo $student['student_id']; ?>">
                                    <input type="hidden" name="term_id" value="<?php echo $current_term['term_id']; ?>">
                                    <input type="hidden" name="student_search" value="<?php echo isset($_GET['student_search']) ? htmlspecialchars($_GET['student_search']) : ''; ?>">
                                    
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="amount">Payment Amount*</label>
                                            <input type="number" id="amount" name="amount" min="0" step="0.01" value="<?php echo number_format($balance, 2, '.', ''); ?>" required>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="currency">Currency*</label>
                                            <select id="currency" name="currency" required>
                                                <option value="USD">USD</option>
                                                <option value="ZWL">ZWL</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="payment_date">Payment Date*</label>
                                            <input type="date" id="payment_date" name="payment_date" value="<?php echo date('Y-m-d'); ?>" required>
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="payment_method">Payment Method*</label>
                                            <select id="payment_method" name="payment_method" required>
                                                <option value="cash">Cash</option>
                                                <option value="bank_transfer">Bank Transfer</option>
                                                <option value="mobile_money">Mobile Money</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label for="receipt_number">Receipt/Reference Number</label>
                                            <input type="text" id="receipt_number" name="receipt_number">
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="notes">Notes</label>
                                            <textarea id="notes" name="notes" rows="2"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="form-actions">
                                        <button type="submit" name="submit_payment" class="btn btn-primary">Record Payment</button>
                                        <button type="submit" name="submit_payment" value="1" class="btn btn-outline" 
                                                onclick="document.querySelector('input[name=print_receipt]').value='1';">
                                            Record & Print Receipt
                                        </button>
                                        <input type="hidden" name="print_receipt" value="0">
                                    </div>
                                </form>
                            <?php else: ?>
                                <div class="alert alert-success">
                                    <strong>Fully Paid!</strong> This student has paid all fees for the current term.
                                </div>
                            <?php endif; ?>
                            
                            <!-- Fee Details -->
                            <div class="fee-details">
                                <h3>Fee Details</h3>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Fee Type</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($fees as $fee): ?>
                                            <tr>
                                                <td><?php echo htmlspecialchars($fee['fee_name']); ?></td>
                                                <td>$<?php echo number_format($fee['amount'], 2); ?></td>
                                                <td>
                                                    <span class="status-badge status-<?php echo $fee['status']; ?>">
                                                        <?php echo ucfirst($fee['status']); ?>
                                                    </span>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                            
                            <!-- Payment History -->
                            <?php if ($total_paid > 0): ?>
                                <div class="payment-history">
                                    <h3>Payment History</h3>
                                    <?php
                                    $history_query = "
                                        SELECT p.*, u.username
                                        FROM payments p
                                        JOIN users u ON p.created_by = u.user_id
                                        WHERE p.student_id = ? AND p.term_id = ?
                                        ORDER BY p.payment_date DESC
                                    ";
                                    
                                    $stmt = $conn->prepare($history_query);
                                    $stmt->bind_param("ii", $student['student_id'], $current_term['term_id']);
                                    $stmt->execute();
                                    $history_result = $stmt->get_result();
                                    ?>
                                    
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Method</th>
                                                <th>Receipt #</th>
                                                <th>Recorded By</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php while ($payment = $history_result->fetch_assoc()): ?>
                                                <tr>
                                                    <td><?php echo date('d/m/Y', strtotime($payment['payment_date'])); ?></td>
                                                    <td><?php echo $payment['currency'] . ' ' . number_format($payment['amount'], 2); ?></td>
                                                    <td><?php echo ucfirst(str_replace('_', ' ', $payment['payment_method'])); ?></td>
                                                    <td><?php echo htmlspecialchars($payment['receipt_number']) ?: sprintf('#%06d', $payment['payment_id']); ?></td>
                                                    <td><?php echo htmlspecialchars($payment['username']); ?></td>
                                                    <td>
                                                        <a href="print_receipt.php?payment_id=<?php echo $payment['payment_id']; ?>" class="btn-icon print-icon" title="Print Receipt">
                                                            <i class="fas fa-print"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            <?php endwhile; ?>
                                        </tbody>
                                    </table>
                                </div>
                            <?php endif; ?>
                        
                        <?php else: ?>
                            <div class="alert alert-warning">
                                <strong>Warning:</strong> No active term set. Please set a current term in Term Management.
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endif; ?>
        </main>
    </div>
    
    <?php include 'includes/footer.php'; ?>
    
    <script src="js/script.js"></script>
</body>
</html>
```

### Fee Structure

**File:** `fee_structure.php`

**Description:** Manages the fee structure for the school. Allows adding, editing, and deleting fee items.

**PHP Implementation:**

```php
<?php
session_start();
require_once 'includes/db_connection.php';
require_once 'includes/functions.php';
require_once 'includes/auth_check.php';

// Check user role for permission
if (!in_array($_SESSION['role'], ['admin', 'bursar'])) {
    header("Location: access_denied.php");
    exit();
}

$success_message = '';
$error_message = '';

// Get all fee items
$fees_query = "SELECT * FROM fees ORDER BY fee_name";
$fees_result = $conn->query($fees_query);

// Handle form submission for adding/editing fee
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_fee'])) {
    $fee_name = sanitize_input($_POST['fee_name']);
    $amount = floatval($_POST['amount']);
    $currency = sanitize_input($_POST['currency']);
    $frequency = sanitize_input($_POST['frequency']);
    $applies_to = isset($_POST['applies_to']) ? implode(',', $_POST['applies_to']) : 'all';
    $description = sanitize_input($_POST['description']);
    $fee_id = isset($_POST['fee_id']) ? intval($_POST['fee_id']) : 0;
    
    // Basic validation
    $validation_errors = array();
    
    if (empty($fee_name)) {
        $validation_errors[] = "Fee name is required.";
    }
    
    if ($amount <= 0) {
        $validation_errors[] = "Amount must be greater than zero.";
    }
    
    if (empty($validation_errors)) {
        if ($fee_id > 0) {
            // Update existing fee
            $update_query = "
                UPDATE fees 
                SET fee_name = ?, amount = ?, currency = ?, frequency = ?, applies_to = ?, description = ?
                WHERE fee_id = ?
            ";
            
            $stmt = $conn->prepare($update_query);
            $stmt->bind_param("sdsssi", $fee_name, $amount, $currency, $frequency, $applies_to, $description, $fee_id);
            
            if ($stmt->execute()) {
                $success_message = "Fee updated successfully.";
                log_action($conn, $_SESSION['user_id'], 'update', 'fees', $fee_id, null, "Updated fee: $fee_name");
            } else {
                $error_message = "Error updating fee: " . $stmt->error;
            }
        } else {
            // Add new fee
            $insert_query = "
                INSERT INTO fees (fee_name, amount, currency, frequency, applies_to, description)
                VALUES (?, ?, ?, ?, ?, ?)
            ";
            
            $stmt = $conn->prepare($insert_query);
            $stmt->bind_param("sdssss", $fee_name, $amount, $currency, $frequency, $applies_to, $description);
            
            if ($stmt->execute()) {
                $fee_id = $conn->insert_id;
                $success_message = "Fee added successfully.";
                log_action($conn, $_SESSION['user_id'], 'create', 'fees', $fee_id, null, "Added new fee: $fee_name");
            } else {
                $error_message = "Error adding fee: " . $stmt->error;
            }
        }
        
        // Refresh the fees list
        $fees_result = $conn->query($fees_query);
    } else {
        $error_message = "Please correct the following errors:<br>• " . implode("<br>• ", $validation_errors);
    }
}

// Handle fee deletion
if (isset($_GET['delete']) && is_numeric($_GET['delete']) && isset($_GET['csrf_token']) && $_GET['csrf_token'] === $_SESSION['csrf_token']) {
    $fee_id = intval($_GET['delete']);
    
    // Check if the fee is in use
    $check_query = "SELECT COUNT(*) AS count FROM student_fees WHERE fee_id = ?";
    $stmt = $conn->prepare($check_query);
    $stmt->bind_param("i", $fee_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    
    if ($row['count'] > 0) {
        $error_message = "This fee cannot be deleted because it is assigned to students.";
    } else {
        // Get fee name for the log
        $name_query = "SELECT fee_name FROM fees WHERE fee_id = ?";
        $stmt = $conn->prepare($name_query);
        $stmt->bind_param("i", $fee_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $fee_name = $result->fetch_assoc()['fee_name'];
        
        // Delete the fee
        $delete_query = "DELETE FROM fees WHERE fee_id = ?";
        $stmt = $conn->prepare($delete_query);
        $stmt->bind_param("i", $fee_id);
        
        if ($stmt->execute()) {
            $success_message = "Fee deleted successfully.";
            log_action($conn, $_SESSION['user_id'], 'delete', 'fees', $fee_id, null, "Deleted fee: $fee_name");
            
            // Refresh the fees list
            $fees_result = $conn->query($fees_query);
        } else {
            $error_message = "Error deleting fee: " . $stmt->error;
        }
    }
}

// Get classes for the "applies to" dropdown
$classes_query = "SELECT DISTINCT class_name FROM classes ORDER BY class_name";
$classes_result = $conn->query($classes_query);
$classes = [];
while ($class = $classes_result->fetch_assoc()) {
    $classes[] = $class['class_name'];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fee Structure - Nhaka School Fees Management</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <div class="container">
        <?php include 'includes/sidebar.php'; ?>
        
        <main class="content">
            <div class="page-header">
                <h1>Fee Structure Management</h1>
                <button id="add-new-fee-btn" class="btn btn-primary">Add New Fee</button>
            </div>
            
            <?php if ($success_message): ?>
                <div class="alert alert-success"><?php echo $success_message; ?></div>
            <?php endif; ?>
            
            <?php if ($error_message): ?>
                <div class="alert alert-danger"><?php echo $error_message; ?></div>
            <?php endif; ?>
            
            <!-- Fee Form (hidden by default) -->
            <div id="fee-form-container" class="card" style="display: none;">
                <div class="card-header">
                    <h2 id="form-title"><i class="fas fa-plus-circle"></i> Add New Fee</h2>
                </div>
                <div class="card-body">
                    <form id="fee-form" action="fee_structure.php" method="post">
                        <input type="hidden" id="fee_id" name="fee_id" value="">
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="fee_name">Fee Name*</label>
                                <input type="text" id="fee_name" name="fee_name" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="amount">Amount*</label>
                                <input type="number" id="amount" name="amount" min="0.01" step="0.01" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="currency">Currency*</label>
                                <select id="currency" name="currency" required>
                                    <option value="USD">USD</option>
                                    <option value="ZWL">ZWL</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="frequency">Frequency*</label>
                                <select id="frequency" name="frequency" required>
                                    <option value="per_term">Per Term</option>
                                    <option value="annual">Annual</option>
                                    <option value="once_off">Once Off</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Applies To</label>
                                <div class="checkbox-group">
                                    <div class="checkbox-wrapper">
                                        <input type="checkbox" id="applies_all" name="applies_all">
                                        <label for="applies_all">All Classes</label>
                                    </div>
                                    
                                    <div class="checkbox-grid">
                                        <?php foreach ($classes as $class): ?>
                                            <div class="checkbox-wrapper">
                                                <input type="checkbox" id="applies_<?php echo $class; ?>" name="applies_to[]" value="<?php echo htmlspecialchars($class); ?>" class="class-checkbox">
                                                <label for="applies_<?php echo $class; ?>">Class <?php echo htmlspecialchars($class); ?></label>
                                            </div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea id="description" name="description" rows="3"></textarea>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" id="cancel-fee-btn" class="btn btn-outline">Cancel</button>
                            <button type="submit" name="save_fee" class="btn btn-primary">Save Fee</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <!-- Fees List -->
            <div class="card">
                <div class="card-header">
                    <h2><i class="fas fa-list"></i> Fee Structure</h2>
                </div>
                <div class="card-body">
                    <?php if ($fees_result->num_rows > 0): ?>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Fee Name</th>
                                        <th>Amount</th>
                                        <th>Currency</th>
                                        <th>Frequency</th>
                                        <th>Applies To</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php while ($fee = $fees_result->fetch_assoc()): ?>
                                        <tr>
                                            <td><?php echo htmlspecialchars($fee['fee_name']); ?></td>
                                            <td><?php echo number_format($fee['amount'], 2); ?></td>
                                            <td><?php echo htmlspecialchars($fee['currency']); ?></td>
                                            <td><?php echo ucfirst(str_replace('_', ' ', $fee['frequency'])); ?></td>
                                            <td>
                                                <?php 
                                                    if ($fee['applies_to'] == 'all') {
                                                        echo 'All Classes';
                                                    } else {
                                                        $applies = explode(',', $fee['applies_to']);
                                                        echo 'Class ' . implode(', Class ', $applies);
                                                    }
                                                ?>
                                            </td>
                                            <td class="actions">
                                                <button class="btn-icon edit-icon" title="Edit" 
                                                        onclick="editFee(<?php echo $fee['fee_id']; ?>, '<?php echo htmlspecialchars($fee['fee_name']); ?>', 
                                                                         <?php echo $fee['amount']; ?>, '<?php echo $fee['currency']; ?>', 
                                                                         '<?php echo $fee['frequency']; ?>', '<?php echo htmlspecialchars($fee['applies_to']); ?>', 
                                                                         '<?php echo htmlspecialchars($fee['description']); ?>')">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <a href="#" class="btn-icon delete-icon" title="Delete" 
                                                   onclick="confirmDelete(<?php echo $fee['fee_id']; ?>, '<?php echo htmlspecialchars($fee['fee_name']); ?>')">
                                                    <i class="fas fa-trash"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    <?php endwhile; ?>
                                </tbody>
                            </table>
                        </div>
                    <?php else: ?>
                        <div class="alert alert-info">No fees have been set up yet. Use the "Add New Fee" button to create your fee structure.</div>
                    <?php endif; ?>
                </div>
            </div>
        </main>
    </div>
    
    <?php include 'includes/footer.php'; ?>
    
    <script src="js/script.js"></script>
    <script>
        // Fee Form Handling
        document.addEventListener('DOMContentLoaded', function() {
            const addNewFeeBtn = document.getElementById('add-new-fee-btn');
            const cancelFeeBtn = document.getElementById('cancel-fee-btn');
            const feeFormContainer = document.getElementById('fee-form-container');
            const formTitle = document.getElementById('form-title');
            const feeForm = document.getElementById('fee-form');
            const appliesToAll = document.getElementById('applies_all');
            const classCheckboxes = document.querySelectorAll('.class-checkbox');
            
            // Show form when "Add New Fee" is clicked
            addNewFeeBtn.addEventListener('click', function() {
                // Reset form
                feeForm.reset();
                document.getElementById('fee_id').value = '';
                formTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Add New Fee';
                
                // Show form
                feeFormContainer.style.display = 'block';
                
                // Scroll to form
                feeFormContainer.scrollIntoView({ behavior: 'smooth' });
            });
            
            // Hide form when "Cancel" is clicked
            cancelFeeBtn.addEventListener('click', function() {
                feeFormContainer.style.display = 'none';
            });
            
            // Handle "All Classes" checkbox
            appliesToAll.addEventListener('change', function() {
                classCheckboxes.forEach(checkbox => {
                    checkbox.disabled = this.checked;
                    checkbox.checked = false;
                });
            });
        });
        
        // Edit Fee Function
        function editFee(feeId, feeName, amount, currency, frequency, appliesTo, description) {
            // Fill form with fee data
            document.getElementById('fee_id').value = feeId;
            document.getElementById('fee_name').value = feeName;
            document.getElementById('amount').value = amount;
            document.getElementById('currency').value = currency;
            document.getElementById('frequency').value = frequency;
            document.getElementById('description').value = description;
            
            const appliesToAll = document.getElementById('applies_all');
            const classCheckboxes = document.querySelectorAll('.class-checkbox');
            
            if (appliesTo === 'all') {
                appliesToAll.checked = true;
                classCheckboxes.forEach(checkbox => {
                    checkbox.disabled = true;
                    checkbox.checked = false;
                });
            } else {
                appliesToAll.checked = false;
                const appliesArray = appliesTo.split(',');
                
                classCheckboxes.forEach(checkbox => {
                    checkbox.disabled = false;
                    checkbox.checked = appliesArray.includes(checkbox.value);
                });
            }
            
            // Update form title
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Fee';
            
            // Show form
            document.getElementById('fee-form-container').style.display = 'block';
            
            // Scroll to form
            document.getElementById('fee-form-container').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Delete Fee Confirmation
        function confirmDelete(feeId, feeName) {
            if (confirm(`Are you sure you want to delete the fee "${feeName}"?`)) {
                window.location.href = `fee_structure.php?delete=${feeId}&csrf_token=<?php echo $_SESSION['csrf_token']; ?>`;
            }
        }
    </script>
</body>
</html>
```

### Term Management

**File:** `term_management.php`

**Description:** Manages school terms/semesters. Allows creating new terms and setting the current active term.

**PHP Implementation:**

```php
<?php
session_start();
require_once 'includes/db_connection.php';
require_once 'includes/functions.php';
require_once 'includes/auth_check.php';

// Check user role for permission
if (!in_array($_SESSION['role'], ['admin', 'bursar'])) {
    header("Location: access_denied.php");
    exit();
}

$success_message = '';
$error_message = '';

// Get all terms
$terms_query = "SELECT * FROM terms ORDER BY start_date DESC";
$terms_result = $conn->query($terms_query);

// Handle form submission for adding/editing term
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_term'])) {
    $term_name = sanitize_input($_POST['term_name']);
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];
    $year = intval($_POST['year']);
    $is_current = isset($_POST['is_current']) ? 1 : 0;
    $term_id = isset($_POST['term_id']) ? intval($_POST['term_id']) : 0;
    
    // Basic validation
    $validation_errors = array();
    
    if (empty($term_name)) {
        $validation_errors[] = "Term name is required.";
    }
    
    if (empty($start_date)) {
        $validation_errors[] = "Start date is required.";
    }
    
    if (empty($end_date)) {
        $validation_errors[] = "End date is required.";
    }
    
    if ($start_date > $end_date) {
        $validation_errors[] = "Start date must be before end date.";
    }
    
    if ($year < 2000 || $year > 2100) {
        $validation_errors[] = "Please enter a valid year.";
    }
    
    if (empty($validation_errors)) {
        // Start transaction
        $conn->begin_transaction();
        
        try {
            // If this is the current term, unset any other current term
            if ($is_current) {
                $reset_query = "UPDATE terms SET is_current = 0";
                $conn->query($reset_query);
            }
            
            if ($term_id > 0) {
                // Update existing term
                $update_query = "
                    UPDATE terms 
                    SET term_name = ?, start_date = ?, end_date = ?, year = ?, is_current = ?
                    WHERE term_id = ?
                ";
                
                $stmt = $conn->prepare($update_query);
                $stmt->bind_param("sssiii", $term_name, $start_date, $end_date, $year, $is_current, $term_id);
                
                if ($stmt->execute()) {
                    $success_message = "Term updated successfully.";
                    log_action($conn, $_SESSION['user_id'], 'update', 'terms', $term_id, null, "Updated term: $term_name");
                } else {
                    throw new Exception("Error updating term: " . $stmt->error);
                }
            } else {
                // Add new term
                $insert_query = "
                    INSERT INTO terms (term_name, start_date, end_date, year, is_current)
                    VALUES (?, ?, ?, ?, ?)
                ";
                
                $stmt = $conn->prepare($insert_query);
                $stmt->bind_param("sssii", $term_name, $start_date, $end_date, $year, $is_current);
                
                if ($stmt->execute()) {
                    $term_id = $conn->insert_id;
                    $success_message = "Term added successfully.";
                    log_action($conn, $_SESSION['user_id'], 'create', 'terms', $term_id, null, "Added new term: $term_name");
                } else {
                    throw new Exception("Error adding term: " . $stmt->error);
                }
            }
            
            // Commit transaction
            $conn->commit();
            
            // Refresh the terms list
            $terms_result = $conn->query($terms_query);
            
        } catch (Exception $e) {
            $conn->rollback();
            $error_message = $e->getMessage();
        }
    } else {
        $error_message = "Please correct the following errors:<br>• " . implode("<br>• ", $validation_errors);
    }
}

// Handle term deletion
if (isset($_GET['delete']) && is_numeric($_GET['delete']) && isset($_GET['csrf_token']) && $_GET['csrf_token'] === $_SESSION['csrf_token']) {
    $term_id = intval($_GET['delete']);
    
    // Check if the term is in use
    $check_query = "
        SELECT 
            (SELECT COUNT(*) FROM student_fees WHERE term_id = ?) AS fees_count,
            (SELECT COUNT(*) FROM payments WHERE term_id = ?) AS payments_count
    ";
    $stmt = $conn->prepare($check_query);
    $stmt->bind_param("ii", $term_id, $term_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    
    if ($row['fees_count'] > 0 || $row['payments_count'] > 0) {
        $error_message = "This term cannot be deleted because it has associated fees or payments.";
    } else {
        // Check if it's the current term
        $current_check_query = "SELECT is_current FROM terms WHERE term_id = ?";
        $stmt = $conn->prepare($current_check_query);
        $stmt->bind_param("i", $term_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $is_current = $result->fetch_assoc()['is_current'];
        
        if ($is_current) {
            $error_message = "Cannot delete the current active term. Please set another term as current first.";
        } else {
            // Get term name for the log
            $name_query = "SELECT term_name FROM terms WHERE term_id = ?";
            $stmt = $conn->prepare($name_query);
            $stmt->bind_param("i", $term_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $term_name = $result->fetch_assoc()['term_name'];
            
            // Delete the term
            $delete_query = "DELETE FROM terms WHERE term_id = ?";
            $stmt = $conn->prepare($delete_query);
            $stmt->bind_param("i", $term_id);
            
            if ($stmt->execute()) {
                $success_message = "Term deleted successfully.";
                log_action($conn, $_SESSION['user_id'], 'delete', 'terms', $term_id, null, "Deleted term: $term_name");
                
                // Refresh the terms list
                $terms_result = $conn->query($terms_query);
            } else {
                $error_message = "Error deleting term: " . $stmt->error;
            }
        }
    }
}

// Handle setting current term
if (isset($_GET['set_current']) && is_numeric($_GET['set_current']) && isset($_GET['csrf_token']) && $_GET['csrf_token'] === $_SESSION['csrf_token']) {
    $term_id = intval($_GET['set_current']);
    
    // Start transaction
    $conn->begin_transaction();
    
    try {
        // Get term name for the log
        $name_query = "SELECT term_name FROM terms WHERE term_id = ?";
        $stmt = $conn->prepare($name_query);
        $stmt->bind_param("i", $term_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $term_name = $result->fetch_assoc()['term_name'];
        
        // Unset any current term
        $reset_query = "UPDATE terms SET is_current = 0";
        $conn->query($reset_query);
        
        // Set the selected term as current
        $update_query = "UPDATE terms SET is_current = 1 WHERE term_id = ?";
        $stmt = $conn->prepare($update_query);
        $stmt->bind_param("i", $term_id);
        
        if ($stmt->execute()) {
            $success_message = "Current term updated successfully.";
            log_action($conn, $_SESSION['user_id'], 'update', 'terms', $term_id, null, "Set as current term: $term_name");
            
            // Commit transaction
            $conn->commit();
            
            // Refresh the terms list
            $terms_result = $conn->query($terms_query);
        } else {
            throw new Exception("Error updating current term: " . $stmt->error);
        }
    } catch (Exception $e) {
        $conn->rollback();
        $error_message = $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Term Management - Nhaka School Fees Management</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <div class="container">
        <?php include 'includes/sidebar.php'; ?>
        
        <main class="content">
            <div class="page-header">
                <h1>Term Management</h1>
                <button id="add-new-term-btn" class="btn btn-primary">Add New Term</button>
            </div>
            
            <?php if ($success_message): ?>
                <div class="alert alert-success"><?php echo $success_message; ?></div>
            <?php endif; ?>
            
            <?php if ($error_message): ?>
                <div class="alert alert-danger"><?php echo $error_message; ?></div>
            <?php endif; ?>
            
            <!-- Term Form (hidden by default) -->
            <div id="term-form-container" class="card" style="display: none;">
                <div class="card-header">
                    <h2 id="form-title"><i class="fas fa-plus-circle"></i> Add New Term</h2>
                </div>
                <div class="card-body">
                    <form id="term-form" action="term_management.php" method="post">
                        <input type="hidden" id="term_id" name="term_id" value="">
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="term_name">Term Name*</label>
                                <input type="text" id="term_name" name="term_name" placeholder="e.g., Term 1 2023" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="year">Academic Year*</label>
                                <input type="number" id="year" name="year" min="2000" max="2100" value="<?php echo date('Y'); ?>" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="start_date">Start Date*</label>
                                <input type="date" id="start_date" name="start_date" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="end_date">End Date*</label>
                                <input type="date" id="end_date" name="end_date" required>
                            </div>
                        </div>
                        
                        <div class="form-group checkbox-group">
                            <input type="checkbox" id="is_current" name="is_current">
                            <label for="is_current">Set as current active term</label>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" id="cancel-term-btn" class="btn btn-outline">Cancel</button>
                            <button type="submit" name="save_term" class="btn btn-primary">Save Term</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <!-- Terms List -->
            <div class="card">
                <div class="card-header">
                    <h2><i class="fas fa-calendar-alt"></i> Academic Terms</h2>
                </div>
                <div class="card-body">
                    <?php if ($terms_result->num_rows > 0): ?>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Term Name</th>
                                        <th>Year</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php while ($term = $terms_result->fetch_assoc()): ?>
                                        <tr class="<?php echo $term['is_current'] ? 'row-highlight' : ''; ?>">
                                            <td><?php echo htmlspecialchars($term['term_name']); ?></td>
                                            <td><?php echo $term['year']; ?></td>
                                            <td><?php echo date('d M Y', strtotime($term['start_date'])); ?></td>
                                            <td><?php echo date('d M Y', strtotime($term['end_date'])); ?></td>
                                            <td>
                                                <?php if ($term['is_current']): ?>
                                                    <span class="status-badge status-current">Current</span>
                                                <?php else: ?>
                                                    <span class="status-badge status-inactive">Inactive</span>
                                                <?php endif; ?>
                                            </td>
                                            <td class="actions">
                                                <?php if (!$term['is_current']): ?>
                                                    <a href="term_management.php?set_current=<?php echo $term['term_id']; ?>&csrf_token=<?php echo $_SESSION['csrf_token']; ?>" 
                                                       class="btn-icon current-icon" title="Set as Current">
                                                        <i class="fas fa-check-circle"></i>
                                                    </a>
                                                <?php endif; ?>
                                                
                                                <button class="btn-icon edit-icon" title="Edit" 
                                                        onclick="editTerm(<?php echo $term['term_id']; ?>, '<?php echo htmlspecialchars($term['term_name']); ?>', 
                                                                           <?php echo $term['year']; ?>, '<?php echo $term['start_date']; ?>', 
                                                                           '<?php echo $term['end_date']; ?>', <?php echo $term['is_current']; ?>)">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                
                                                <?php if (!$term['is_current']): ?>
                                                    <a href="#" class="btn-icon delete-icon" title="Delete" 
                                                       onclick="confirmDelete(<?php echo $term['term_id']; ?>, '<?php echo htmlspecialchars($term['term_name']); ?>')">
                                                        <i class="fas fa-trash"></i>
                                                    </a>
                                                <?php endif; ?>
                                            </td>
                                        </tr>
                                    <?php endwhile; ?>
                                </tbody>
                            </table>
                        </div>
                    <?php else: ?>
                        <div class="alert alert-info">No terms have been set up yet. Use the "Add New Term" button to create your first academic term.</div>
                    <?php endif; ?>
                </div>
            </div>
        </main>
    </div>
    
    <?php include 'includes/footer.php'; ?>
    
    <script src="js/script.js"></script>
    <script>
        // Term Form Handling
        document.addEventListener('DOMContentLoaded', function() {
            const addNewTermBtn = document.getElementById('add-new-term-btn');
            const cancelTermBtn = document.getElementById('cancel-term-btn');
            const termFormContainer = document.getElementById('term-form-container');
            const formTitle = document.getElementById('form-title');
            const termForm = document.getElementById('term-form');
            
            // Show form when "Add New Term" is clicked
            addNewTermBtn.addEventListener('click', function() {
                // Reset form
                termForm.reset();
                document.getElementById('term_id').value = '';
                document.getElementById('year').value = new Date().getFullYear();
                formTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Add New Term';
                
                // Show form
                termFormContainer.style.display = 'block';
                
                // Scroll to form
                termFormContainer.scrollIntoView({ behavior: 'smooth' });
            });
            
            // Hide form when "Cancel" is clicked
            cancelTermBtn.addEventListener('click', function() {
                termFormContainer.style.display = 'none';
            });
        });
        
        // Edit Term Function
        function editTerm(termId, termName, year, startDate, endDate, isCurrent) {
            // Fill form with term data
            document.getElementById('term_id').value = termId;
            document.getElementById('term_name').value = termName;
            document.getElementById('year').value = year;
            document.getElementById('start_date').value = startDate;
            document.getElementById('end_date').value = endDate;
            document.getElementById('is_current').checked = isCurrent === 1;
            
            // Update form title
            document.getElementById('form-title').innerHTML = '<i class="fas fa-edit"></i> Edit Term';
            
            // Show form
            document.getElementById('term-form-container').style.display = 'block';
            
            // Scroll to form
            document.getElementById('term-form-container').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Delete Term Confirmation
        function confirmDelete(termId, termName) {
            if (confirm(`Are you sure you want to delete the term "${termName}"?`)) {
                window.location.href = `term_management.php?delete=${termId}&csrf_token=<?php echo $_SESSION['csrf_token']; ?>`;
            }
        }
    </script>
</body>
</html>
```

### Reports

**File:** `reports.php`

**Description:** Generates various financial reports including fee collection summaries, class-wise fee collections, and outstanding fees reports.

**PHP Implementation:**

```php
<?php
session_start();
require_once 'includes/db_connection.php';
require_once 'includes/functions.php';
require_once 'includes/auth_check.php';

// Check for sufficient permissions
if (!in_array($_SESSION['role'], ['admin', 'bursar', 'clerk'])) {
    header("Location: access_denied.php");
    exit();
}

// Get all terms for the term selector
$terms_query = "SELECT * FROM terms ORDER BY start_date DESC";
$terms_result = $conn->query($terms_query);

// Get current term
$current_term_query = "SELECT * FROM terms WHERE is_current = 1 LIMIT 1";
$current_term_result = $conn->query($current_term_query);
$current_term = $current_term_result->fetch_assoc();
$selected_term_id = $current_term ? $current_term['term_id'] : 0;

// Handle term selection
if (isset($_GET['term_id']) && is_numeric($_GET['term_id'])) {
    $selected_term_id = intval($_GET['term_id']);
    
    // Get the selected term details
    $term_query = "SELECT * FROM terms WHERE term_id = ? LIMIT 1";
    $stmt = $conn->prepare($term_query);
    $stmt->bind_param("i", $selected_term_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $selected_term = $result->fetch_assoc();
} else {
    $selected_term = $current_term;
}

// Get classes for class-wise reports
$classes_query = "SELECT DISTINCT class FROM students WHERE class IS NOT NULL AND class != '' ORDER BY class";
$classes_result = $conn->query($classes_query);

// Generate summary report
$summary = array(
    'total_expected' => 0,
    'total_collected' => 0,
    'total_outstanding' => 0,
    'collection_rate' => 0,
    'total_students' => 0,
    'fully_paid' => 0,
    'partially_paid' => 0,
    'not_paid' => 0
);

// Generate fee collection by class report
$class_report = array();

// Generate fee collection by type report
$fee_type_report = array();

// Generate students with outstanding fees report
$outstanding_report = array();

if ($selected_term) {
    // Calculate summary statistics
    $summary_query = "
        SELECT 
            (SELECT COUNT(*) FROM students) AS total_students,
            (SELECT SUM(amount) FROM student_fees WHERE term_id = ?) AS total_expected,
            (SELECT SUM(amount) FROM payments WHERE term_id = ?) AS total_collected,
            (SELECT COUNT(*) FROM (
                SELECT student_id FROM student_fees 
                WHERE term_id = ? AND status = 'paid'
                GROUP BY student_id
            ) AS paid) AS fully_paid,
            (SELECT COUNT(*) FROM (
                SELECT student_id FROM student_fees 
                WHERE term_id = ? AND status = 'partial'
                GROUP BY student_id
            ) AS partial) AS partially_paid,
            (SELECT COUNT(*) FROM (
                SELECT student_id FROM student_fees 
                WHERE term_id = ? AND status = 'pending'
                GROUP BY student_id
            ) AS pending) AS not_paid
    ";
    
    $stmt = $conn->prepare($summary_query);
    $stmt->bind_param("iiiii", $selected_term_id, $selected_term_id, $selected_term_id, $selected_term_id, $selected_term_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $summary_data = $result->fetch_assoc();
    
    $summary['total_students'] = $summary_data['total_students'] ?: 0;
    $summary['total_expected'] = $summary_data['total_expected'] ?: 0;
    $summary['total_collected'] = $summary_data['total_collected'] ?: 0;
    $summary['total_outstanding'] = $summary['total_expected'] - $summary['total_collected'];
    $summary['collection_rate'] = $summary['total_expected'] > 0 ? 
                                  ($summary['total_collected'] / $summary['total_expected'] * 100) : 0;
    $summary['fully_paid'] = $summary_data['fully_paid'] ?: 0;
    $summary['partially_paid'] = $summary_data['partially_paid'] ?: 0;
    $summary['not_paid'] = $summary_data['not_paid'] ?: 0;
    
    // Calculate fee collection by class
    $class_report_query = "
        SELECT 
            s.class,
            COUNT(DISTINCT s.student_id) AS student_count,
            SUM(sf.amount) AS total_expected,
            COALESCE(
                (SELECT SUM(p.amount) 
                 FROM payments p 
                 WHERE p.term_id = ? AND p.student_id IN (
                     SELECT student_id FROM students WHERE class = s.class
                 )
                ), 0
            ) AS total_collected
        FROM students s
        JOIN student_fees sf ON s.student_id = sf.student_id
        WHERE sf.term_id = ? AND s.class IS NOT NULL AND s.class != ''
        GROUP BY s.class
        ORDER BY s.class
    ";
    
    $stmt = $conn->prepare($class_report_query);
    $stmt->bind_param("ii", $selected_term_id, $selected_term_id);
    $stmt->execute();
    $class_report_result = $stmt->get_result();
    
    while ($row = $class_report_result->fetch_assoc()) {
        $outstanding = $row['total_expected'] - $row['total_collected'];
        $collection_rate = $row['total_expected'] > 0 ? ($row['total_collected'] / $row['total_expected'] * 100) : 0;
        
        $class_report[] = array(
            'class' => $row['class'],
            'student_count' => $row['student_count'],
            'total_expected' => $row['total_expected'],
            'total_collected' => $row['total_collected'],
            'outstanding' => $outstanding,
            'collection_rate' => $collection_rate
        );
    }
    
    // Calculate fee collection by type
    $fee_type_query = "
        SELECT 
            f.fee_id,
            f.fee_name,
            SUM(sf.amount) AS total_expected,
            COALESCE(
                (SELECT SUM(pd.amount) 
                 FROM payment_details pd
                 JOIN payments p ON pd.payment_id = p.payment_id
                 WHERE p.term_id = ? AND pd.fee_id = f.fee_id
                ), 0
            ) AS total_collected
        FROM fees f
        JOIN student_fees sf ON f.fee_id = sf.fee_id
        WHERE sf.term_id = ?
        GROUP BY f.fee_id, f.fee_name
        ORDER BY f.fee_name
    ";
    
    $stmt = $conn->prepare($fee_type_query);
    $stmt->bind_param("ii", $selected_term_id, $selected_term_id);
    $stmt->execute();
    $fee_type_result = $stmt->get_result();
    
    while ($row = $fee_type_result->fetch_assoc()) {
        $outstanding = $row['total_expected'] - $row['total_collected'];
        $collection_rate = $row['total_expected'] > 0 ? ($row['total_collected'] / $row['total_expected'] * 100) : 0;
        
        $fee_type_report[] = array(
            'fee_name' => $row['fee_name'],
            'total_expected' => $row['total_expected'],
            'total_collected' => $row['total_collected'],
            'outstanding' => $outstanding,
            'collection_rate' => $collection_rate
        );
    }
    
    // Get students with outstanding fees
    $outstanding_query = "
        SELECT 
            s.student_id, 
            s.first_name,
            s.last_name,
            s.class,
            s.section,
            SUM(sf.amount) AS total_due,
            COALESCE(
                (SELECT SUM(p.amount) 
                 FROM payments p 
                 WHERE p.student_id = s.student_id AND p.term_id = ?
                ), 0
            ) AS total_paid,
            (SUM(sf.amount) - COALESCE(
                (SELECT SUM(p.amount) 
                 FROM payments p 
                 WHERE p.student_id = s.student_id AND p.term_id = ?
                ), 0
            )) AS outstanding
        FROM students s
        JOIN student_fees sf ON s.student_id = sf.student_id
        WHERE sf.term_id = ?
        GROUP BY s.student_id, s.first_name, s.last_name, s.class, s.section
        HAVING outstanding > 0
        ORDER BY outstanding DESC
    ";
    
    $stmt = $conn->prepare($outstanding_query);
    $stmt->bind_param("iii", $selected_term_id, $selected_term_id, $selected_term_id);
    $stmt->execute();
    $outstanding_result = $stmt->get_result();
    
    while ($row = $outstanding_result->fetch_assoc()) {
        $outstanding_report[] = $row;
    }
}

// Handle report export
if (isset($_GET['export']) && $_GET['export'] === 'excel' && isset($_GET['report_type'])) {
    $report_type = $_GET['report_type'];
    
    // Set headers for Excel download
    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment; filename=' . $report_type . '_report_' . date('Y-m-d') . '.xls');
    header('Cache-Control: max-age=0');
    
    // Include the export view based on report type
    include "reports/export_{$report_type}.php";
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reports - Nhaka School Fees Management</title>
    <link rel="stylesheet" href="css/styles.css">
    <style>
        @media print {
            .no-print {
                display: none;
            }
            body {
                background: white;
            }
            .container {
                width: 100%;
                margin: 0;
                padding: 0;
            }
            .content {
                margin: 0;
                padding: 10px;
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="no-print">
        <?php include 'includes/header.php'; ?>
    </div>
    
    <div class="container">
        <div class="no-print">
            <?php include 'includes/sidebar.php'; ?>
        </div>
        
        <main class="content">
            <div class="page-header no-print">
                <h1>Financial Reports</h1>
                <div class="page-actions">
                    <button onclick="window.print()" class="btn btn-outline"><i class="fas fa-print"></i> Print</button>
                </div>
            </div>
            
            <!-- Term Selector -->
            <div class="card term-selector no-print">
                <div class="card-body">
                    <form action="reports.php" method="get" class="term-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="term_id">Select Term:</label>
                                <select id="term_id" name="term_id" onchange="this.form.submit()">
                                    <?php 
                                    $terms_result->data_seek(0);
                                    while ($term = $terms_result->fetch_assoc()): 
                                    ?>
                                        <option value="<?php echo $term['term_id']; ?>" <?php if ($term['term_id'] == $selected_term_id) echo 'selected'; ?>>
                                            <?php echo htmlspecialchars($term['term_name']); ?>
                                            <?php if ($term['is_current']) echo ' (Current)'; ?>
                                        </option>
                                    <?php endwhile; ?>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            <?php if ($selected_term): ?>
                <!-- Title with Term Info -->
                <div class="report-header">
                    <h2>Financial Reports for <?php echo htmlspecialchars($selected_term['term_name']); ?></h2>
                    <p class="term-dates">
                        Period: <?php echo date('d M Y', strtotime($selected_term['start_date'])); ?> - 
                        <?php echo date('d M Y', strtotime($selected_term['end_date'])); ?>
                    </p>
                </div>
                
                <!-- Summary Report -->
                <div class="card">
                    <div class="card-header">
                        <h2><i class="fas fa-chart-pie"></i> Fee Collection Summary</h2>
                        <a href="reports.php?export=excel&report_type=summary&term_id=<?php echo $selected_term_id; ?>" class="btn btn-sm no-print">
                            <i class="fas fa-file-excel"></i> Export
                        </a>
                    </div>
                    <div class="card-body">
                        <div class="summary-stats">
                            <div class="stat-card">
                                <div class="stat-title">Total Expected</div>
                                <div class="stat-value">$<?php echo number_format($summary['total_expected'], 2); ?></div>
                            </div>
                            
                            <div class="stat-card">
                                <div class="stat-title">Total Collected</div>
                                <div class="stat-value">$<?php echo number_format($summary['total_collected'], 2); ?></div>
                            </div>
                            
                            <div class="stat-card">
                                <div class="stat-title">Outstanding</div>
                                <div class="stat-value">$<?php echo number_format($summary['total_outstanding'], 2); ?></div>
                            </div>
                            
                            <div class="stat-card">
                                <div class="stat-title">Collection Rate</div>
                                <div class="stat-value"><?php echo number_format($summary['collection_rate'], 1); ?>%</div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <h3>Student Payment Status</h3>
                                <table class="table">
                                    <tr>
                                        <td>Total Students</td>
                                        <td class="text-right"><?php echo $summary['total_students']; ?></td>
                                    </tr>
                                    <tr>
                                        <td>Fully Paid</td>
                                        <td class="text-right"><?php echo $summary['fully_paid']; ?></td>
                                    </tr>
                                    <tr>
                                        <td>Partially Paid</td>
                                        <td class="text-right"><?php echo $summary['partially_paid']; ?></td>
                                    </tr>
                                    <tr>
                                        <td>Not Paid</td>
                                        <td class="text-right"><?php echo $summary['not_paid']; ?></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <!-- Placeholder for chart in a real implementation -->
                                <div class="chart-container">
                                    <p class="text-center">Payment Status Distribution</p>
                                    <div id="payment-status-chart" style="height: 200px;">
                                        <!-- Canvas for chart would be here -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Class-wise Report -->
                <div class="card">
                    <div class="card-header">
                        <h2><i class="fas fa-school"></i> Fee Collection by Class</h2>
                        <a href="reports.php?export=excel&report_type=class&term_id=<?php echo $selected_term_id; ?>" class="btn btn-sm no-print">
                            <i class="fas fa-file-excel"></i> Export
                        </a>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Class</th>
                                        <th>Students</th>
                                        <th>Expected ($)</th>
                                        <th>Collected ($)</th>
                                        <th>Outstanding ($)</th>
                                        <th>Collection Rate (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php if (count($class_report) > 0): ?>
                                        <?php foreach ($class_report as $row): ?>
                                            <tr>
                                                <td>Class <?php echo htmlspecialchars($row['class']); ?></td>
                                                <td><?php echo $row['student_count']; ?></td>
                                                <td><?php echo number_format($row['total_expected'], 2); ?></td>
                                                <td><?php echo number_format($row['total_collected'], 2); ?></td>
                                                <td><?php echo number_format($row['outstanding'], 2); ?></td>
                                                <td><?php echo number_format($row['collection_rate'], 1); ?>%</td>
                                            </tr>
                                        <?php endforeach; ?>
                                    <?php else: ?>
                                        <tr>
                                            <td colspan="6" class="text-center">No data available for the selected term.</td>
                                        </tr>
                                    <?php endif; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <!-- Fee Type Report -->
                <div class="card">
                    <div class="card-header">
                        <h2><i class="fas fa-money-bill-wave"></i> Fee Collection by Type</h2>
                        <a href="reports.php?export=excel&report_type=fee_type&term_id=<?php echo $selected_term_id; ?>" class="btn btn-sm no-print">
                            <i class="fas fa-file-excel"></i> Export
                        </a>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Fee Type</th>
                                        <th>Expected ($)</th>
                                        <th>Collected ($)</th>
                                        <th>Outstanding ($)</th>
                                        <th>Collection Rate (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php if (count($fee_type_report) > 0): ?>
                                        <?php foreach ($fee_type_report as $row): ?>
                                            <tr>
                                                <td><?php echo htmlspecialchars($row['fee_name']); ?></td>
                                                <td><?php echo number_format($row['total_expected'], 2); ?></td>
                                                <td><?php echo number_format($row['total_collected'], 2); ?></td>
                                                <td><?php echo number_format($row['outstanding'], 2); ?></td>
                                                <td><?php echo number_format($row['collection_rate'], 1); ?>%</td>
                                            </tr>
                                        <?php endforeach; ?>
                                    <?php else: ?>
                                        <tr>
                                            <td colspan="5" class="text-center">No data available for the selected term.</td>
                                        </tr>
                                    <?php endif; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <!-- Outstanding Fees Report -->
                <div class="card">
                    <div class="card-header">
                        <h2><i class="fas fa-exclamation-circle"></i> Students with Outstanding Fees</h2>
                        <a href="reports.php?export=excel&report_type=outstanding&term_id=<?php echo $selected_term_id; ?>" class="btn btn-sm no-print">
                            <i class="fas fa-file-excel"></i> Export
                        </a>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Student ID</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Section</th>
                                        <th>Total Due ($)</th>
                                        <th>Paid ($)</th>
                                        <th>Outstanding ($)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php if (count($outstanding_report) > 0): ?>
                                        <?php foreach ($outstanding_report as $row): ?>
                                            <tr>
                                                <td><?php echo htmlspecialchars($row['student_id']); ?></td>
                                                <td><?php echo htmlspecialchars($row['first_name'] . ' ' . $row['last_name']); ?></td>
                                                <td><?php echo htmlspecialchars($row['class']); ?></td>
                                                <td><?php echo htmlspecialchars($row['section']); ?></td>
                                                <td><?php echo number_format($row['total_due'], 2); ?></td>
                                                <td><?php echo number_format($row['total_paid'], 2); ?></td>
                                                <td><?php echo number_format($row['outstanding'], 2); ?></td>
                                            </tr>
                                        <?php endforeach; ?>
                                    <?php else: ?>
                                        <tr>
                                            <td colspan="7" class="text-center">No students with outstanding fees for the selected term.</td>
                                        </tr>
                                    <?php endif; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            <?php else: ?>
                <div class="alert alert-warning">
                    <strong>Warning:</strong> No term selected. Please select a term to view reports.
                </div>
            <?php endif; ?>
        </main>
    </div>
    
    <div class="no-print">
        <?php include 'includes/footer.php'; ?>
    </div>
    
    <script src="js/script.js"></script>
</body>
</html>
```

### User Management

**File:** `user_management.php`

**Description:** Manages system users. Allows administrators to add, edit, and delete users, as well as assign roles.

**PHP Implementation:**

```php
<?php
session_start();
require_once 'includes/db_connection.php';
require_once 'includes/functions.php';
require_once 'includes/auth_check.php';

// Check user role for permission
if ($_SESSION['role'] !== 'admin') {
    header("Location: access_denied.php");
    exit();
}

$success_message = '';
$error_message = '';

// Get all users
$users_query = "SELECT * FROM users ORDER BY username";
$users_result = $conn->query($users_query);

// Handle form submission for adding/editing user
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['save_user'])) {
    $username = sanitize_input($_POST['username']);
    $first_name = sanitize_input($_POST['first_name']);
    $last_name = sanitize_input($_POST['last_name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $role = sanitize_input($_POST['role']);
    $is_active = isset($_POST['is_active']) ? 1 : 0;
    $user_id = isset($_POST['user_id']) ? intval($_POST['user_id']) : 0;
    $password = $_POST['password']; // Only used for new users or password changes
    
    // Basic validation
    $validation_errors = array();
    
    if (empty($username)) {
        $validation_errors[] = "Username is required.";
    }
    
    if (empty($first_name)) {
        $validation_errors[] = "First name is required.";
    }
    
    if (empty($last_name)) {
        $validation_errors[] = "Last name is required.";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $validation_errors[] = "Valid email is required.";
    }
    
    if ($user_id == 0 && empty($password)) {
        $validation_errors[] = "Password is required for new users.";
    }
    
    if (!empty($password) && strlen($password) < 8) {
        $validation_errors[] = "Password must be at least 8 characters long.";
    }
    
    // Check if username or email already exists
    if ($user_id == 0) {
        $check_query = "
            SELECT COUNT(*) as count FROM users 
            WHERE username = ? OR email = ?
        ";
        $stmt = $conn->prepare($check_query);
        $stmt->bind_param("ss", $username, $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $exists = $result->fetch_assoc()['count'] > 0;
        
        if ($exists) {
            $validation_errors[] = "Username or email already exists.";
        }
    }
    
    if (empty($validation_errors)) {
        if ($user_id > 0) {
            // Update existing user
            if (!empty($password)) {
                // Update with password change
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                $update_query = "
                    UPDATE users 
                    SET username = ?, first_name = ?, last_name = ?, email = ?, 
                        role = ?, is_active = ?, password = ?
                    WHERE user_id = ?
                ";
                
                $stmt = $conn->prepare($update_query);
                $stmt->bind_param("sssssisi", $username, $first_name, $last_name, $email, $role, $is_active, $hashed_password, $user_id);
            } else {
                // Update without changing password
                $update_query = "
                    UPDATE users 
                    SET username = ?, first_name = ?, last_name = ?, email = ?, 
                        role = ?, is_active = ?
                    WHERE user_id = ?
                ";
                
                $stmt = $conn->prepare($update_query);
                $stmt->bind_param("ssssiii", $username, $first_name, $last_name, $email, $role, $is_active, $user_id);
            }
            
            if ($stmt->execute()) {
                $success_message = "User updated successfully.";
                log_action($conn, $_SESSION['user_id'], 'update', 'users', $user_id, null, "Updated user: $username");
            } else {
                $error_message = "Error updating user: " . $stmt->error;
            }
        } else {
            // Add new user
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $insert_query = "
                INSERT INTO users (username, password, first_name, last_name, email, role, is_active)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ";
            
            $stmt = $conn->prepare($insert_query);
            $stmt->bind_param("ssssssi", $username, $hashed_password, $first_name, $last_name, $email, $role, $is_active);
            
            if ($stmt->execute()) {
                $user_id = $conn->insert_id;
                $success_message = "User added successfully.";
                log_action($conn, $_SESSION['user_id'], 'create', 'users', $user_id, null, "Added new user: $username");
            } else {
                $error_message = "Error adding user: " . $stmt->error;
            }
        }
        
        // Refresh the users list
        $users_result = $conn->query($users_query);
    } else {
        $error_message = "Please correct the following errors:<br>• " . implode("<br>• ", $validation_errors);
    }
}

// Handle user deletion
if (isset($_GET['delete']) && is_numeric($_GET['delete']) && isset($_GET['csrf_token']) && $_GET['csrf_token'] === $_SESSION['csrf_token']) {
    $user_id = intval($_GET['delete']);
    
    // Prevent self-deletion
    if ($user_id === $_SESSION['user_id']) {
        $error_message = "You cannot delete your own account.";
    } else {
        // Get user info for the log
        $info_query = "SELECT username FROM users WHERE user_id = ?";
        $stmt = $conn->prepare($info_query);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $username = $result->fetch_assoc()['username'];
        
        // Delete the user
        $delete_query = "DELETE FROM users WHERE user_id = ?";
        $stmt = $conn->prepare($delete_query);
        $stmt->bind_param("i", $user_id);
        
        if ($stmt->execute()) {
            $success_message = "User deleted successfully.";
            log_action($conn, $_SESSION['user_id'], 'delete', 'users', $user_id, null, "Deleted user: $username");
            
            // Refresh the users list
            $users_result = $conn->query($users_query);
        } else {
            $error_message = "Error deleting user: " . $stmt->error;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Management - Nhaka School Fees Management</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <?php include 'includes/header.php'; ?>
    
    <div class="container">
        <?php include 'includes/sidebar.php'; ?>
        
        <main class="content">
            <div class="page-header">
                <h1>User Management</h1>
                <button id="add-new-user-btn" class="btn btn-primary">Add New User</button>
            </div>
            
            <?php if ($success_message): ?>
                <div class="alert alert-success"><?php echo $success_message; ?></div>
            <?php endif; ?>
            
            <?php if ($error_message): ?>
                <div class="alert alert-danger"><?php echo $error_message; ?></div>
            <?php endif; ?>
            
            <!-- User Form (hidden by default) -->
            <div id="user-form-container" class="card" style="display: none;">
                <div class="card-header">
                    <h2 id="form-title"><i class="fas fa-user-plus"></i> Add New User</h2>
                </div>
                <div class="card-body">
                    <form id="user-form" action="user_management.php" method="post">
                        <input type="hidden" id="user_id" name="user_id" value="">
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="username">Username*</label>
                                <input type="text" id="username" name="username" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="password" id="password-label">Password*</label>
                                <input type="password" id="password"  name="password" autocomplete="new-password">
                                <p class="form-hint" id="password-hint">Leave blank to keep the current password.</p>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="first_name">First Name*</label>
                                <input type="text" id="first_name" name="first_name" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="last_name">Last Name*</label>
                                <input type="text" id="last_name" name="last_name" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="email">Email*</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="role">Role*</label>
                                <select id="role" name="role" required>
                                    <option value="admin">Admin</option>
                                    <option value="bursar">Bursar</option>
                                    <option value="clerk">Clerk</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group checkbox-group">
                            <input type="checkbox" id="is_active" name="is_active" checked>
                            <label for="is_active">Active</label>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" id="cancel-user-btn" class="btn btn-outline">Cancel</button>
                            <button type="submit" name="save_user" class="btn btn-primary">Save User</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <!-- Users List -->
            <div class="card">
                <div class="card-header">
                    <h2><i class="fas fa-users"></i> System Users</h2>
                </div>
                <div class="card-body">
                    <?php if ($users_result->num_rows > 0): ?>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Last Login</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php while ($user = $users_result->fetch_assoc()): ?>
                                        <tr>
                                            <td><?php echo htmlspecialchars($user['username']); ?></td>
                                            <td><?php echo htmlspecialchars($user['first_name'] . ' ' . $user['last_name']); ?></td>
                                            <td><?php echo htmlspecialchars($user['email']); ?></td>
                                            <td><?php echo ucfirst(htmlspecialchars($user['role'])); ?></td>
                                            <td>
                                                <?php if ($user['is_active']): ?>
                                                    <span class="status-badge status-active">Active</span>
                                                <?php else: ?>
                                                    <span class="status-badge status-inactive">Inactive</span>
                                                <?php endif; ?>
                                            </td>
                                            <td>
                                                <?php 
                                                    if ($user['last_login']) {
                                                        echo date('d/m/Y H:i', strtotime($user['last_login']));
                                                    } else {
                                                        echo 'Never';
                                                    }
                                                ?>
                                            </td>
                                            <td class="actions">
                                                <button class="btn-icon edit-icon" title="Edit" 
                                                        onclick="editUser(
                                                            <?php echo $user['user_id']; ?>, 
                                                            '<?php echo htmlspecialchars($user['username']); ?>',
                                                            '<?php echo htmlspecialchars($user['first_name']); ?>',
                                                            '<?php echo htmlspecialchars($user['last_name']); ?>',
                                                            '<?php echo htmlspecialchars($user['email']); ?>',
                                                            '<?php echo $user['role']; ?>',
                                                            <?php echo $user['is_active']; ?>
                                                        )">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                
                                                <?php if ($user['user_id'] != $_SESSION['user_id']): ?>
                                                    <a href="#" class="btn-icon delete-icon" title="Delete" 
                                                       onclick="confirmDelete(<?php echo $user['user_id']; ?>, '<?php echo htmlspecialchars($user['username']); ?>')">
                                                        <i class="fas fa-trash"></i>
                                                    </a>
                                                <?php endif; ?>
                                            </td>
                                        </tr>
                                    <?php endwhile; ?>
                                </tbody>
                            </table>
                        </div>
                    <?php else: ?>
                        <div class="alert alert-info">No users found.</div>
                    <?php endif; ?>
                </div>
            </div>
        </main>
    </div>
    
    <?php include 'includes/footer.php'; ?>
    
    <script src="js/script.js"></script>
    <script>
        // User Form Handling
        document.addEventListener('DOMContentLoaded', function() {
            const addNewUserBtn = document.getElementById('add-new-user-btn');
            const cancelUserBtn = document.getElementById('cancel-user-btn');
            const userFormContainer = document.getElementById('user-form-container');
            const formTitle = document.getElementById('form-title');
            const userForm = document.getElementById('user-form');
            const passwordLabel = document.getElementById('password-label');
            const passwordHint = document.getElementById('password-hint');
            
            // Show form when "Add New User" is clicked
            addNewUserBtn.addEventListener('click', function() {
                // Reset form
                userForm.reset();
                document.getElementById('user_id').value = '';
                passwordLabel.textContent = 'Password*';
                passwordHint.style.display = 'none';
                document.getElementById('password').required = true;
                formTitle.innerHTML = '<i class="fas fa-user-plus"></i> Add New User';
                
                // Default values
                document.getElementById('is_active').checked = true;
                
                // Show form
                userFormContainer.style.display = 'block';
                
                // Scroll to form
                userFormContainer.scrollIntoView({ behavior: 'smooth' });
            });
            
            // Hide form when "Cancel" is clicked
            cancelUserBtn.addEventListener('click', function() {
                userFormContainer.style.display = 'none';
            });
        });
        
        // Edit User Function
        function editUser(userId, username, firstName, lastName, email, role, isActive) {
            // Fill form with user data
            document.getElementById('user_id').value = userId;
            document.getElementById('username').value = username;
            document.getElementById('first_name').value = firstName;
            document.getElementById('last_name').value = lastName;
            document.getElementById('email').value = email;
            document.getElementById('role').value = role;
            document.getElementById('is_active').checked = isActive === 1;
            
            // Password field is optional when editing
            document.getElementById('password').required = false;
            document.getElementById('password-label').textContent = 'Password';
            document.getElementById('password-hint').style.display = 'block';
            document.getElementById('password').value = '';
            
            // Update form title
            document.getElementById('form-title').innerHTML = '<i class="fas fa-user-edit"></i> Edit User';
            
            // Show form
            document.getElementById('user-form-container').style.display = 'block';
            
            // Scroll to form
            document.getElementById('user-form-container').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Delete User Confirmation
        function confirmDelete(userId, username) {
            if (confirm(`Are you sure you want to delete user "${username}"?`)) {
                window.location.href = `user_management.php?delete=${userId}&csrf_token=<?php echo $_SESSION['csrf_token']; ?>`;
            }
        }
    </script>
</body>
</html>
```

## Common Functions

**File:** `includes/functions.php`

This file contains common utility functions used throughout the application:

```php
<?php
// Function to sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to log user actions
function log_action($conn, $user_id, $action, $table_name, $record_id, $old_values, $new_values) {
    $ip_address = $_SERVER['REMOTE_ADDR'];
    
    $query = "
        INSERT INTO audit_log (user_id, action, table_name, record_id, old_values, new_values, ip_address) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("issssss", $user_id, $action, $table_name, $record_id, $old_values, $new_values, $ip_address);
    $stmt->execute();
}

// Function to format currency
function format_currency($amount, $currency = 'USD') {
    if ($currency === 'USD') {
        return '$' . number_format($amount, 2);
    } else {
        return number_format($amount, 2) . ' ' . $currency;
    }
}

// Function to generate receipt number
function generate_receipt_number($payment_id) {
    return sprintf('NHK%06d', $payment_id);
}

// Function to check if a user has specific permission
function has_permission($required_roles, $user_role) {
    if (!is_array($required_roles)) {
        $required_roles = [$required_roles];
    }
    return in_array($user_role, $required_roles);
}

// Generate a random password
function generate_random_password($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
    $password = '';
    $charactersLength = strlen($characters);
    
    for ($i = 0; $i < $length; $i++) {
        $password .= $characters[rand(0, $charactersLength - 1)];
    }
    
    return $password;
}

// Function to send email (placeholder - implement with your preferred method)
function send_email($to, $subject, $message) {
    // Implementation will depend on your hosting environment
    // This is a placeholder
    return mail($to, $subject, $message);
}

// Function to calculate age from date of birth
function calculate_age($dob) {
    $birthdate = new DateTime($dob);
    $today = new DateTime('today');
    $age = $birthdate->diff($today)->y;
    return $age;
}

// Function to get the current academic term
function get_current_term($conn) {
    $query = "SELECT * FROM terms WHERE is_current = 1 LIMIT 1";
    $result = $conn->query($query);
    
    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    }
    
    return null;
}

// Generate a CSRF token if not exists
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
```

**File:** `includes/db_connection.php`

This file establishes a database connection:

```php
<?php
// Database connection parameters
$servername = "localhost";
$username = "your_db_username"; // Replace with your actual database username
$password = "your_db_password"; // Replace with your actual database password
$dbname = "nhaka_school_fees"; // Replace with your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set charset to utf8
$conn->set_charset("utf8");
?>
```

**File:** `includes/auth_check.php`

This file checks if a user is authenticated:

```php
<?php
// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Check if user account is still active
$user_id = $_SESSION['user_id'];
$check_query = "SELECT is_active FROM users WHERE user_id = ? LIMIT 1";
$stmt = $conn->prepare($check_query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    // User no longer exists
    session_destroy();
    header("Location: login.php?error=account_removed");
    exit();
}

$user_status = $result->fetch_assoc();
if ($user_status['is_active'] != 1) {
    // User account disabled
    session_destroy();
    header("Location: login.php?error=account_disabled");
    exit();
}
?>
```

## Security Considerations

1. **Password Hashing**: Always store passwords using PHP's `password_hash()` and verify with `password_verify()`.

2. **Input Sanitization**: Sanitize all user input using the `sanitize_input()` function.

3. **Prepared Statements**: Use prepared statements with parameter binding for all database queries to prevent SQL injection.

4. **CSRF Protection**: Implement CSRF tokens for all forms to prevent cross-site request forgery attacks.

5. **Session Security**: Configure secure session settings and implement session timeout.

6. **Role-Based Access Control**: Restrict access to pages based on user roles.

7. **Data Validation**: Validate all data on both client and server sides.

8. **Audit Logging**: Log all important actions for security auditing.

## Error Handling

1. **Database Errors**: Catch and log database errors, but show user-friendly messages.

2. **Form Validation**: Provide clear error messages for invalid form submissions.

3. **404 Page**: Create a custom 404 page for not found resources.

4. **Error Logging**: Log all errors to a file for later analysis.

5. **Graceful Degradation**: Ensure the application handles errors gracefully.

## Deployment Considerations

1. **PHP Version**: Ensure the hosting environment supports PHP 7.4 or higher.

2. **Database Setup**: Import the provided SQL schema to set up the database.

3. **File Permissions**: Set appropriate permissions for files and directories.

4. **Configuration**: Update the database connection parameters in `includes/db_connection.php`.

5. **Testing**: Test all features thoroughly after deployment.

This README provides a comprehensive guide for implementing the Nhaka School Fees Management System in PHP. Follow the code examples and implementation details for each page to create a functional system.

