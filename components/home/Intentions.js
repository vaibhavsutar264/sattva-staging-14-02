import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import { apiRoute, getApiHeader } from '../../utils/helpers';

const Intentions = () => {
  const [intentions, setIntentions] = useState([]);
  useEffect(() => {
    const requestOptions = {
      headers: getApiHeader(),
    };
    axios.get(apiRoute('cms-all-intentions'), requestOptions).then((res) => {
      setIntentions(res.data);
    });
  }, []);

  const getBackgroundImage = (image) => {
    var img = {
      backgroundImage: `url(${image})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: `center`,
    };
    return img;
  };
  return (
    <>
      {intentions && intentions.length !== 0 ? (
        <section>
          <OwlCarousel
            className='owl-carousel owl-theme owlslider-block'
            nav={true}
            items={1}
            autoplay={true}
            loop
            smartSpeed={2000}
            autoplayTimeout={15000}
            nav
            dots={false}
          >
            {intentions.map((item, index) => {
              if (index === 0) {
                return (
                  <div
                    className='connectslider-wrapper bg-cover bg-position-left'
                    style={getBackgroundImage(item.image)}
                    key={index}
                  >
                    <div className='container'>
                      <div className='row'>
                        <div className='col-lx-12 col-lg-12 col-md-12 col-sm-12 text-center'>
                          <h4>{item.title}</h4>
                          <h1
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          ></h1>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className='connectslider-wrapper bg-cover bg-position-left'
                    style={getBackgroundImage(item.image)}
                    key={index}
                  >
                    <div className='container'>
                      <div className='row'>
                        <div className='col-lx-6 col-lg-6 col-md-12 col-sm-12'></div>
                        <div className='col-lx-6 col-lg-6 col-md-12 col-sm-12 contact-content'>
                          <h2>{item.title}</h2>
                          <p>{item.description} </p>
                          {item.link && item.link !== '' ? (
                            <a
                              class='btn btn-lg waves-effect waves-light'
                              href={item.link}
                            >
                              start your free trial now
                            </a>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </OwlCarousel>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default Intentions;
