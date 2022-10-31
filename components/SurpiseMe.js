import axios from 'axios';
import React, { useState } from 'react'
import { apiRoute, getApiHeader } from '../utils/helpers';

function SurpiseMe() {
    const [surprisemeVideo, setSuprisemeVideo] = useState([]);
    const surpriseMe = () => {
        const requestOptions = { headers: getApiHeader(true), };
        axios
            .get(apiRoute('get-surprise-me', requestOptions))
            .then((res) => {
                console.log(res.data);
                setSuprisemeVideo(res.data);
                // this.setState({ surprisemeVideo: res.data });
            });
    }

    return (
        <section className="email-sec mb-40">
            <div className="py-5 h-auto bg-white">
                <div className="container">
                    <div className="mail">
                        <div>
                            <h3 className="wow fadeInUp flex-1 mb-1"><span className='quote-writer-text black-text mr-2 tilt'>Surpise </span><span style={{ color: '#5c1c72' }}>me</span></h3>
                            <p className='revamp-para'>See what the moment holds for you.</p>
                        </div>
                        <div className="app-box">
                            <div className='text-right'>
                                <a onClick={surpriseMe} data-toggle="modal" data-target="#surpriseme" className='btn btn-sm'>Surpise me</a>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="surpriseme" tabindex="-1" role="dialog" aria-labelledby="testimonial2Title" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <iframe className="ifmplayer" src={surprisemeVideo.video_url} frameborder="0"></iframe>
                                    <h5 class="my-3" >{surprisemeVideo.title}</h5>
                                    <div className='surprise-indendation' dangerouslySetInnerHTML={{ __html: surprisemeVideo.description }} />
                                    <a className='btn btn-sm mt-2' href={'/user/video-details/' + surprisemeVideo.id}><span>Go to video page</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SurpiseMe