import React, { Component } from 'react';
import { imagePath } from '../../utils/helpers';

function TeamListDetails({ team, setTeamEmail }) {

  return (
    <div className="col-md-6 col-lg-4">
      <div className="card border-0 transform-on-hover team-card">
        <div className="team-profile-img">
          <a className="lightbox">
            <img src={imagePath('team/' + team.image)} alt="Card Image" className="card-img-top" />
          </a>
        </div>
        <div className="card-body team-card-body">
          <h5><a>{team.name}</a></h5>
          <p className="text-muted card-text">{team.description}</p>
          <hr />
          <ul className="profile-ul team-profile-ul">
            <li>
              {team.specialities.map((items, index) => {
                return (
                  <p key={index}>{items.name}</p>
                );
              })}
            </li>
          </ul>
        </div>
        <div className="overlay">
          <div className="team-profile-links">


            <a className="btn btn-sm" onClick={setTeamEmail.bind(null, team.email)}>Send Email</a>
            <div className="profile-left">
              <ul className="mb-0">
                {team.facebook
                  ? <li><a href={team.facebook} target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                  : ''
                }
                {team.twitter
                  ? <li><a href={team.twitter} target="_blank"><i className="fab fa-twitter"></i></a></li>
                  : ''
                }
                {team.instagram
                  ? <li><a href={team.instagram} target="_blank"><i className="fab fa-instagram"></i></a></li>
                  : ''
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
}

export default TeamListDetails;