import React from 'react'
import PropTypes from 'prop-types';


//redux
import { connect } from 'react-redux';
import Button from '../others/Button.component';
import { deleteEducation } from '../../redux/profile/profile.action';

const Education = ({ education,deleteEducation }) => {

if(education===null){return <div className='container'><h2>هنوز تحصیلاتت رو اضافه نکردی!</h2></div>}
const educations =education.map(edu =>(
    
    <tr key={edu._id}>
        <td >{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td className='hide-sm'>
            
          {new Intl.DateTimeFormat('fa-IR').format(new Date(edu.from))} - {
                edu.to === null ? ' تا امروز': new Intl.DateTimeFormat('fa-IR').format(new Date(edu.to))
            }
        </td>
        <td>
            <Button type='submit' color="danger" font= "vazir" onClick={() =>deleteEducation(edu._id)}>حذف</Button>
        </td>
    </tr>
))

    return (
        <div className='container detail'>
            <h2 className="my-2"> تحصیلات </h2>
            <table className="table">
                <thead>
                  <tr>
                     <th>محل تحصیل</th>
                     <th className='hide-sm'>مدرک</th>
                     <th className='hide-sm'>سال های فعالیت</th>
                     <th></th>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </div>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired

}

export default connect(null,{deleteEducation})(Education);
