import React, { useState } from 'react'
import PropTypes from 'prop-types';
import moment from "moment-jalaali";
import DatePicker from 'react-datepicker2';
import { withRouter } from 'react-router-dom';
import Button from '../others/Button.component';
//
import { connect } from 'react-redux'
import { addEducation } from '../../redux/profile/profile.action'
import FormInput from '../others/FormInput.component';

const AddEducation = ({ addEducation, history }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: moment(),
        to: moment(),
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);
    const { school, degree, fieldofstudy, from, to, current, description } = formData;




    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        addEducation(formData, history);
        console.log(formData);
    }
    return (
        <>
            <section className="container"  >
                <div className="container-group">
                    <h1 className="large text-primary">
                        تحصیلات خود را اضافه کنید
                 </h1>
                    <p className="lead">
                        <i className="fas fa-code-branch"></i> {' '}دانشگاهی یا دوره های آموزشی
                 </p>
                    <small>* موارد مورد نیاز</small>
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <FormInput type="text" placeholder="* مدرک " name="degree" value={degree}
                                onChange={onChange} required />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="* دانشگاه یا محیط آموزشی.." name="school" value={school}
                                onChange={onChange} required />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="مکان(شهر،محدوده شهری)" value={fieldofstudy}
                                onChange={onChange} name="fieldofstudy" />
                        </div>
                        <div className="form-group">
                            <h4>از تاریخ</h4>
                            {/* <input type="date" name="from" value={from} onChange={onChange} /> */}
                            <DatePicker onChange={(value) => setFormData({ ...formData,from: value })} value={from} isGregorian={false} showTodayButton={false} timePicker={false} />
                        </div>
                        <div className="form-group">
                            <p><input type="checkbox" name="current" checked={current} value={current}
                                onChange={(e) => {
                                    setFormData({ ...formData, current: !current });
                                    toggleDisabled(!toDateDisabled)
                                }}
                            /> هنوز مشغولم{' '}</p>
                        </div>
                        <div className="form-group">
                            <h4>تا تاریخ</h4>
                            <DatePicker onChange={(value) => setFormData({ ...formData, to: value })} value={to} isGregorian={false} showTodayButton={false} timePicker={false} disabled={toDateDisabled? 'disabled':''} />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="description"
                                value={description}
                                onChange={onChange}
                                cols="30"
                                rows="5"
                                minLength={10}
                                maxLength={50}
                                placeholder=" خلاصه ای از  شرایط کاری بنویس "
                                style={{ resize: 'none', height: '150px', borderRadius: '1rem' }}
                            ></textarea>
                        </div>
                        <div>
                            <Button type="submit" color="primary" myStyle='my-1' > ثبت</Button>
                            <Button link color="light" to="/dashboard">بازگشت</Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation))
