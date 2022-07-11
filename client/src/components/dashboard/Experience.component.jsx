import React from 'react'
import PropTypes from 'prop-types';


//redux
import { connect } from 'react-redux';
import Button from '../others/Button.component';
import { deleteExperience } from '../../redux/profile/profile.action';

const Experience = ({ experience,deleteExperience }) => {

if(experience===null){return <div className='container'><h2>سابقه کاری نداری!</h2></div>}
const experiences =experience.map(exp =>(
    
    <tr key={exp._id}>
        <td >{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td className='hide-sm'>
            
          {new Intl.DateTimeFormat('fa-IR').format(new Date(exp.from))} - {
                exp.to === null ? ' تا امروز': new Intl.DateTimeFormat('fa-IR').format(new Date(exp.to))
            }
        </td>
        <td>
            <Button type='submit' color="danger" font= "vazir" onClick={()=>deleteExperience(exp._id)}>حذف</Button>
        </td>
    </tr>
))

    return (
        <div className='container detail' style={{maxWidth:"90rem"}}>
            <h2 className="my-2">تجربیات کاری </h2>
            <table className="table">
                <thead>
                  <tr>
                     <th>شرکت</th>
                     <th className='hide-sm'>عنوان</th>
                     <th className='hide-sm'>سال های فعالیت</th>
                     <th></th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </div>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience:PropTypes.func.isRequired

}

export default connect (null , {deleteExperience})(Experience)
