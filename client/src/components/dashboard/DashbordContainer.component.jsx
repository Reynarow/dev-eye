import React from 'react'
import DashboardAction from './DashboardAction';
import { Link } from 'react-router-dom'

const DashbordContainer = ({ profile, user }) => {
    return (
        <div className='container' style={{ minHeight: '30rem' }}>
            <h1 className='large text-primary' style={{ marginTop: '1rem' }}>حساب کاربری</h1>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <p className='lead' style={{ marginTop: '1rem' }}>
                    <i className='fas fa-user'></i> {user && user.name}،  خوش اومدی &nbsp;
                    <span style={{ display: 'inline-block', transform: 'rotate(-90deg)', fontSize: '2rem' }} >:)</span>
                </p>


                {profile !== null ? <DashboardAction /> : <>  <p> هنوز پروفایلت رو درست نکردی، لطفا تکمیلش کن</p>
                    <Link to='/create-profile' className="btn btn-primary my-1"> ساخت پروفایل</Link> </>}
            </div>
        </div>
    )
}

export default DashbordContainer;
