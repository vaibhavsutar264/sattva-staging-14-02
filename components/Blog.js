import moment from 'moment';
import Link from 'next/link';
import Moment from 'react-moment';
import { FacebookShareButton, EmailShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, WhatsappIcon, EmailIcon, TwitterIcon, } from "react-share";
import Constants from '../constants';

const Blog = ({ posts }) => {
  return (
    <div>
      <div className='card card-course'>
        <Link
          href={`/blog/${posts.slug}`}

        >
          <a>
            <div className='card-course-img blog-card-img'>
              <img className='img-fluid' src={posts.image} />
            </div>
          </a>
        </Link>
        <div className='card-course-content ml-30'>
          <Link
            href={{
              pathname: `/blog/${posts.slug}`,
            }}
          >
            <a>
              <div className='blog-headings'>
                <h6 className='react-reveal courseHeading revamp-blog-title'>{posts.title} <span className='revamp-small-span'> by <span className='quote-writer-text black-text ml-2'>{posts.author}</span></span></h6>
              </div>
            </a>
          </Link>
          {posts.description.length > 300 ? (

            // <p>{`${posts.description.substring(0, 300)}...`}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: `${posts.description.substring(0, 300)}...`,
              }}
            ></p>



          ) : (
            <p dangerouslySetInnerHTML={{
              __html: `${posts.description}`,
            }}></p>
          )}
          <div className="card-ft">
            {/* <h5>{`By - ${posts.author}`}</h5> */}
            <h5>{`Published Date - ${moment(posts.schdedule_date).format("DD-MM-YYYY")}`}</h5>
          </div>
          <div className="card-ft-icon mt-3">
            <FacebookShareButton
              url={Constants.SITE_URL + `/blog/${posts.id}`}
              quote={posts.title}
              hashtag="#sattvayogiclifestyle"
            >

              <i class="fa fa-facebook" aria-hidden="true"></i>
            </FacebookShareButton>

            <TwitterShareButton
              url={Constants.SITE_URL + `/blog/${posts.id}`}
              quote={posts.title}
              hashtag="#sattvayogiclifestyle"
            >

              <i class="fab fa-twitter"></i>
            </TwitterShareButton>

            <WhatsappShareButton
              url={Constants.SITE_URL + `/blog/${posts.id}`}
              quote={posts.title}
              hashtag="#sattvayogiclifestyle"
            >

              <i class="fab fa-whatsapp"></i>
            </WhatsappShareButton>

            <EmailShareButton
              url={Constants.SITE_URL + `/blog/${posts.id}`}
              quote={posts.title}
              hashtag="#sattvayogiclifestyle"
            >

              <i class="far fa-envelope"></i>
            </EmailShareButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
