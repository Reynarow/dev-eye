import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select';
import Button from '../others/Button.component';
import Spinner from '../others/Spinner.component'
//react-router
import { withRouter } from 'react-router-dom';
//redux 
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../redux/profile/profile.action'


const EditProfile = ({ profile: { profile, loading }, createProfile, history, getCurrentProfile }) => {

    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''

    });
    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        getCurrentProfile();
        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram,


        })
    }, [loading])
    //destructure states
    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    //select input  options 
    const options = [

        { value: 'توسعه دهنده جوان', label: 'توسعه دهنده جوان' },
        { value: 'توسعه دهنده با تجربه', label: 'توسعه دهنده با تجربه' },
        { value: 'مدیر', label: 'مدیر' },
        { value: 'دانشجو یا پژوهشگر', label: 'دانشجو یا پژوهشگر' },
        { value: 'مدرس', label: 'مدرس' },
        { value: 'کارورز', label: 'کارورز' },
        { value: 'موارد دیگر', label: 'موارد دیگر' }
    ];

    //style for Select Component
    const customStyles = {

        control: (base, state) => ({
            ...base,
            borderRadius: state.menuIsOpen ? '1.2rem 1.2rem 0 0' : '10rem',
            width: '100%'

        }),
        menu: (base) => ({
            ...base,
            borderRadius: '0 0 1.2rem 1.2rem',
            // kill the gap
            marginTop: 0,

        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0
        })
    };

    const onChangeSelect = selectedOption => setFormData({ ...formData, status: selectedOption.value })
    const onChangeInputs = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
        
    }
    return loading ? <Spinner /> :
        (
            <div className='container' >
                <div className="container-group" >
                    <h1 className="large text-primary">
                        ساخت پروفایل شخصی
                </h1>
                    <p className="lead">
                        <i className="fas fa-user"></i> اطلاعات مورد نیاز رو تکمیل کن تا پروفایلت ساخته بشه
                 </p>
                    <small>*موارد مورد نیاز</small>
                    <form className="form" onSubmit={onSubmit} >
                        <div className="form-group">
                            <Select options={options} styles={customStyles} name='status' 
                                isRtl={true} placeholder='* تخصص خود را انتخاب کنید...'
                                value={options.find(option => option.value == status)}
                                onChange={onChangeSelect} />
                            <small className="form-text">وضعیت حرفه ‌ای خودت رو انتخاب کن</small>
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="شرکت" name="company" value={company} onChange={onChangeInputs} />
                            <small className="form-text">میتونه شرکت خودت باشه یا شرکتی که کار میکنی</small>
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="وب سایت" name="website" value={website}
                                onChange={onChangeInputs} style={{ direction: 'ltr' }} />
                            <small className="form-text">وب سایت شخصی یا شرکتی</small>
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="موقیعت مکانی" name="location" value={location} onChange={onChangeInputs} />
                            <small className="form-text"
                            >شهر یا مکان حال حاضرت</small
                            >
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="* مهارت ها" name="skills" value={skills}
                                style={{ direction: 'ltr' }} onChange={onChangeInputs} />
                            <small className="form-text"
                            >لطفا از ویرگول برای جداسازی مهارت ها استفاده کن(HTML,CSS,...)</small
                            >
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="شناسه گیت هاب"
                                name="githubusername"
                                value={githubusername} onChange={onChangeInputs}
                            />
                            <small className="form-text"
                            >اگر میخوای آخرین ریپوزیتوری هات رو اینجا داشته باشی گیت هاب خودت رو وارد کن</small
                            >
                        </div>
                        <div className="form-group">
                            <textarea placeholder="خلاصه کوتاه از شرح حال خودت بنویس"
                                name="bio" style={{ resize: 'none', height: '150px', borderRadius: '1rem' }}
                                value={bio} onChange={onChangeInputs} />
                            <small className="form-text">درباره خودت بمون بگو </small>
                        </div>

                        <div className="my-2">
                            <Button onClick={() => toggleSocialInputs(!displaySocialInputs)} color='light' type='button'  >اضافه کردن شبکه های اجتماعی (اختیاری)</Button>
                        </div>
                        <div style={{
                            width: '100%', maxHeight: `${displaySocialInputs ? '500px' : '0'}`
                            , transition: 'max-height 0.3s', overflow: 'hidden'
                        }} >
                            <div className="form-group social-input" >
                                <i className="fab fa-twitter fa-2x"></i>
                                <input type="text" placeholder="توییتر" name="twitter" value={twitter} onChange={onChangeInputs} />
                            </div>

                            <div className="form-group social-input" >
                                <i className="fab fa-facebook fa-2x"></i>
                                <input type="text" placeholder="فیسبوک " name="facebook" value={facebook} onChange={onChangeInputs} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-youtube fa-2x"></i>
                                <input type="text" placeholder="یوتیوب" name="youtube" value={youtube} onChange={onChangeInputs} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-linkedin fa-2x"></i>
                                <input type="text" placeholder="لینکدین" name="linkedin" value={linkedin} onChange={onChangeInputs} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-instagram fa-2x"></i>
                                <input type="text" placeholder="اینستاگرام" name="instagram" value={instagram} onChange={onChangeInputs} />
                            </div>
                        </div>
                        <div >
                            <Button type="submit" color="primary" myStyle='my-1' >{loading ? <span className='spinner'></span> : 'ثبت'}</Button>
                            <Button link color="light" to="/dashboard">بازگشت</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    profile: state.profile
})

export default (connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfile))
