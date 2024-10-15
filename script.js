document.addEventListener('DOMContentLoaded', function () {
    handleLoginForm();    // التعامل مع نموذج تسجيل الدخول
    initializeClock();    // بدء عرض الوقت
    displayDates();       // عرض التواريخ الميلادية والهجرية
});

// Handle login form submission
function handleLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();  // منع إعادة تحميل الصفحة
            const role = document.getElementById('role').value;
            
            // تحديد الصفحات التي سيتم إعادة التوجيه إليها بناءً على الدور
            const roleRedirects = {
                'student': 'main_student.html',
                'department_supervisor': 'main_department.html',
                'company_supervisor': 'main_company.html'
            };

            // إعادة التوجيه إلى الصفحة المناسبة
            if (roleRedirects[role]) {
                window.location.href = roleRedirects[role];
            }
        });
    }
}

// Initialize clock function to update time every second
function initializeClock() {
    setInterval(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);  // تحديث الساعة كل ثانية
}

// Display dates in Gregorian and Hijri formats
function displayDates() {
    const today = new Date();
    
    // Display Gregorian Date
    const gregorianDate = today.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('gregorian-date').textContent = gregorianDate;

    // تحويل التاريخ الميلادي إلى هجري باستخدام مكتبة Hijri-Converter
    const hijriDateObj = HijriConverter.gregorianToHijri(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const hijriDate = `${hijriDateObj.hDay} ${hijriDateObj.hMonthName} ${hijriDateObj.hYear}`;
    document.getElementById('hijri-date').textContent = hijriDate;
}