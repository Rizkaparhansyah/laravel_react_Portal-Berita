import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Dashboard(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [isNotif, setIsNotif] = useState(false);
    const [isDelete, setIsDelete] = useState(false);


    const handleSubmit = () => {
        const data = {
            title, description, category
        }
        Inertia.post('/news', data)
        setIsNotif(true)
        setTitle('')
        setDescription('')
        setCategory('')
    }

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get('/news')
        }
        return;
    }, [])
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Berita saya</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 bg-slate-100 p-2">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 card bg-white border-b shadow-xl border-gray-200">
                        {isNotif &&
                            <div className="alert alert-info shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <span>{props.errors.title || props.errors.description || props.errors.category || props.flash.message}</span>
                                </div>
                            </div>
                        }
                        <input type="text" placeholder="Judul" className="mt-5 input input-bordered w-full bg-slate-50" onChange={(title) => setTitle(title.target.value)} value={title} required />
                        <input type="text" placeholder="Deskripsi" className="mt-5 input input-bordered w-full bg-slate-50" onChange={(description) => setDescription(description.target.value)} value={description} required />
                        <input type="text" placeholder="Kategori" className="mt-5 input input-bordered w-full bg-slate-50" onChange={(category) => setCategory(category.target.value)} value={category} required />
                        <button className='btn btn-primary mt-4' onClick={() => handleSubmit()}>Submit</button>
                    </div>
                    <div className=''>
                        {props.myNews && props.myNews.length > 0 ? props.myNews.map((news, i) => {
                            return (
                                <div key={i} className="card bg-slate-50 shadow-xl mt-2">
                                    <div className="card-body">
                                        <div className="flex justify-between">
                                            <h2 className="card-title">
                                                {news.title}
                                                <div className="badge badge-secondary">NEW</div>
                                            </h2>

                                            <h2 className="card-title">
                                                <div className="badge badge-info justify-items-end">{news.categori}</div>
                                            </h2>
                                        </div>
                                        <p>{news.description}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-warning">
                                                <Link href={route('edit.news')} method="get" data={{ id: news.id }} as="button">
                                                    Edit
                                                </Link>
                                            </div>
                                            <div className="badge badge-error"><Link href={route('delete.news')}  method="post" data={{ id: news.id }} as="button">
                                                Delete
                                            </Link></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <p>Anda belum memiliki berita</p>}
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
