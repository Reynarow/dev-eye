import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from '../others/Button.component';
//
import { connect } from 'react-redux'
import { addExprerience } from '../../redux/profile/profile.action'

const AddExperience = ({ addExprerience, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);
    const { company, title, location, from, to, current, description } = formData;




    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        addExprerience(formData, history);
    }
    return (
        <>
            <section className="container"  >
                <div className="container-group">
                    <h1 className="large text-primary">
                        تجربه ی کاری خود را اضافه کنید
                 </h1>
                    <p className="lead">
                        <i className="fas fa-code-branch"></i> {' '}هر تجربه ای که در برنامه نویسی داری
                 </p>
                    <small>* موارد مورد نیاز</small>
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="* عنوان کاری" name="title" value={title}
                                onChange={onChange} required />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="* شرکت" name="company" value={company}
                                onChange={onChange} required />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="مکان(شهر،محدوده شهری)" value={location}
                                onChange={onChange} name="location" />
                        </div>
                        <div className="form-group">
                            <h4>از تاریخ</h4>
                            <input type="date" name="from" value={from} onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <p><input type="checkbox" name="current" checked={current} value={current}
                                onChange={(e) => {
                                    setFormData({ ...formData, current: !current });
                                    toggleDisabled(!toDateDisabled)
                                }}
                            /> شغل فعلی{' '}</p>
                        </div>
                        <div className="form-group">
                            <h4>تا تاریخ</h4>
                            <input type="date" name="to" value={to} onChange={onChange}
                                disabled={toDateDisabled ? 'disabled' : ''} />
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

AddExperience.propTypes = {
    addExprerience: PropTypes.func.isRequired,
}

export default connect(null, { addExprerience })(withRouter(AddExperience))
