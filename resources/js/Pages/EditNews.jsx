import React, { useState } from 'react'
import { Head } from '@inertiajs/inertia-react';
import Navbar from '@/Components/Navbar';
import { Inertia } from '@inertiajs/inertia';

export default function EditNews(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categori, setCategory] = useState('');
    const [isNotif, setIsNotif] = useState(false);

    if (title,description,categori == null){
        return Inertia.get('/news')
    }

    const handleSubmit = () => {
        const data = {
            id: props.myNews.id, title, description, categori
        }

        Inertia.post('/news/update', data)
        setIsNotif(true)
        setTitle('')
        setDescription('')
        setCategory('')
        return Inertia.get('/news')

    }


    const backSubmit = () => {
        Inertia.get('/news')
    }
    return (
        <div className='min-h-screen  bg-slate-200'>
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="card bg-slate-50 shadow-xl m-2">
                <div className="p-4 text-2xl">EDIT BERITA</div>
                <div className="card-body">
                    {isNotif &&
                        <div className="alert alert-info shadow-lg">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{props.flash.message}</span>
                            </div>
                        </div>
                    }
                    <input type="text" placeholder="Judul" className="m-2 input input-bordered w-full bg-slate-50" onChange={(title) => setTitle(title.target.value)} defaultValue={props.myNews.title} />
                    <input type="text" placeholder="Deskripsi" className="m-2 input input-bordered w-full bg-slate-50" onChange={(description) => setDescription(description.target.value)} defaultValue={props.myNews.description} />
                    <input type="text" placeholder="Kategori" className="m-2 input input-bordered w-full bg-slate-50" onChange={(categori) => setCategory(categori.target.value)} defaultValue={props.myNews.categori} />
                    <button className='btn btn-primary m-2' onClick={() => handleSubmit()}>Update</button>
                    <button className='btn btn-primary m-2' onClick={() => backSubmit()}>Back</button>
                </div>
            </div>
        </div>
    )
}
