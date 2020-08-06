import React from 'react';
import Button from '../others/Button.component';


const DashboardAction = () => {
    return (
        <div class="dash-buttons">
            <Button link to="/edit-profile" color="light">
                <i className="fas fa-user-circle text-primary"></i> ویرایش پروفایل</Button>
            <Button link to="/add-experience" color="light">
                <i className="fab fa-black-tie text-primary"></i> اضافه کردن سابقه  </Button>
            <Button link to="/add-education" color="light">
                <i className="fas fa-graduation-cap text-primary"></i> اضافه کردن تحصیلات</Button>
        </div>
    )
}

export default DashboardAction