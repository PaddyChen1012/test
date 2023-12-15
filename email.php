<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form</title>
</head>
<body>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = $_POST["name"];
        $email = $_POST["email"];
        $message = $_POST["message"];

        $to = "paddy_chen@atarroba.com";  // 收件人邮箱地址
        $subject = "New Contact Form Submission";
        $headers = "From: $email";

        mail($to, $subject, $message, $headers);

        echo "Email sent successfully!";
    }
    ?>

    <h1>Contact Us</h1>

    <form action="" method="post">
        <label for="name">Your Name:</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Your Email:</label>
        <input type="email" id="email" name="email" required>

        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="submit">Send Email</button>
    </form>

</body>
</html>
