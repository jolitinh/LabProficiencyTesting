import React from 'react';

import calvinandhobbes from '../../assets/img/avatars/profiles/calvinandhobbes.jpg';
import Avatar2 from '../../assets/img/avatars/profiles/avatar-2.jpg';
import Avatar3 from '../../assets/img/avatars/profiles/avatar-3.jpg';
import Avatar4 from '../../assets/img/avatars/profiles/avatar-4.jpg';

import Avatar5 from '../../assets/img/avatars/profiles/avatar-5.jpg';

import Project1 from '../../assets/img/avatars/projects/project-1.jpg';
import Project2 from '../../assets/img/avatars/projects/project-2.jpg';
import Project3 from '../../assets/img/avatars/projects/project-3.jpg';

import Card from './Card';

const Dashboard = () => (
  <React.Fragment>
    {/* Modal: Members */}
    <div className="modal fade" id="modalMembers" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-card card" data-toggle="lists" data-lists-values='["name"]'>
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col">
                  {/* Title */}
                  <h4 className="card-header-title" id="exampleModalCenterTitle">
                    Add a member
                  </h4>
                </div>
                <div className="col-auto">
                  {/* Close */}
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
              </div>
              {/* / .row */}
            </div>
            <div className="card-header">
              {/* Form */}
              <form>
                <div className="input-group input-group-flush input-group-merge">
                  <input
                    type="search"
                    className="form-control form-control-prepended search"
                    placeholder="Search"
                  />
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <span className="fe fe-search" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="card-body">
              {/* List group */}
              <ul className="list-group list-group-flush list my-n3">
                <li className="list-group-item px-0">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      {/* Avatar */}
                      <a href="profile-posts.html" className="avatar">
                        {/* <img
                            src="assets/img/avatars/profiles/calvinandhobbes.jpg"
                            alt="..."
                            className="avatar-img rounded-circle"
                          /> */}
                        <img src={Avatar5} alt="..." className="avatar-img rounded-circle" />
                      </a>
                    </div>
                    <div className="col ml-n2">
                      {/* Title */}
                      <h4 className="mb-1 name">
                        <a href="profile-posts.html">Daniel Dix</a>
                      </h4>
                      {/* Time */}
                      <p className="small mb-0">
                        <span className="text-success">●</span>
                        Online
                      </p>
                    </div>
                    <div className="col-auto">
                      {/* Button */}
                      <a href="#!" className="btn btn-sm btn-white">
                        Add
                      </a>
                    </div>
                  </div>
                  {/* / .row */}
                </li>
                <li className="list-group-item px-0">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      {/* Avatar */}
                      <a href="profile-posts.html" className="avatar">
                        <img
                          src="assets/img/avatars/profiles/avatar-6.jpg"
                          alt="..."
                          className="avatar-img rounded-circle"
                        />
                      </a>
                    </div>
                    <div className="col ml-n2">
                      {/* Title */}
                      <h4 className="mb-1 name">
                        <a href="profile-posts.html">Daniel Dix</a>
                      </h4>
                      {/* Time */}
                      <p className="small mb-0">
                        <span className="text-success">●</span>
                        Online
                      </p>
                    </div>
                    <div className="col-auto">
                      {/* Button */}
                      <a href="#!" className="btn btn-sm btn-white">
                        Add
                      </a>
                    </div>
                  </div>
                  {/* / .row */}
                </li>
                <li className="list-group-item px-0">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      {/* Avatar */}
                      <a href="profile-posts.html" className="avatar">
                        <img
                          src="assets/img/avatars/profiles/avatar-7.jpg"
                          alt="..."
                          className="avatar-img rounded-circle"
                        />
                      </a>
                    </div>
                    <div className="col ml-n2">
                      {/* Title */}
                      <h4 className="mb-1 name">
                        <a href="profile-posts.html">Boi</a>
                      </h4>
                      {/* Time */}
                      <p className="small mb-0">
                        <span className="text-warning">●</span>
                        Busy
                      </p>
                    </div>
                    <div className="col-auto">
                      {/* Button */}
                      <a href="#!" className="btn btn-sm btn-white">
                        Add
                      </a>
                    </div>
                  </div>
                  {/* / .row */}
                </li>
                <li className="list-group-item px-0">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      {/* Avatar */}
                      <a href="profile-posts.html" className="avatar">
                        <img
                          src="assets/img/avatars/profiles/avatar-8.jpg"
                          alt="..."
                          className="avatar-img rounded-circle"
                        />
                      </a>
                    </div>
                    <div className="col ml-n2">
                      {/* Title */}
                      <h4 className="mb-1 name">
                        <a href="profile-posts.html">Daniel Dix</a>
                      </h4>
                      {/* Time */}
                      <p className="small mb-0">
                        <span className="text-danger">●</span>
                        Offline
                      </p>
                    </div>
                    <div className="col-auto">
                      {/* Button */}
                      <a href="#!" className="btn btn-sm btn-white">
                        Add
                      </a>
                    </div>
                  </div>
                  {/* / .row */}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Modal: Search */}
    <div
      className="modal fade"
      id="sidebarModalSearch"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-vertical" role="document">
        <div className="modal-content">
          <div className="modal-body" data-toggle="lists" data-lists-values='["name"]'>
            {/* Form */}
            <form className="mb-4">
              <div className="input-group input-group-merge">
                <input
                  type="search"
                  className="form-control form-control-prepended search"
                  placeholder="Search"
                />
                <div className="input-group-prepend">
                  <div className="input-group-text">
                    <span className="fe fe-search" />
                  </div>
                </div>
              </div>
            </form>
            {/* List group */}
            <div className="my-n3">
              <div className="list-group list-group-flush list">
                <a href="team-overview.html" className="list-group-item px-0">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      {/* Avatar */}
                      <div className="avatar">
                        <img
                          src="assets/img/avatars/teams/team-logo-1.jpg"
                          alt="..."
                          className="avatar-img rounded"
                        />
                      </div>
                    </div>
                    <div className="col ml-n2">
                      {/* Title */}
                      <h4 className="text-body mb-1 name">Some random app</h4>
                      {/* Time */}
                      <p className="small text-muted mb-0">
                        <span className="fe fe-clock" />
                        <time dateTime="2018-05-24">Updated 2hr ago</time>
                      </p>
                    </div>
                  </div>
                  {/* / .row */}
                </a>
                <a href="team-overview.html" className="list-group-item px-0">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      {/* Avatar */}
                      <div className="avatar">
                        <img
                          src="assets/img/avatars/teams/team-logo-2.jpg"
                          alt="..."
                          className="avatar-img rounded"
                        />
                      </div>
                    </div>
                    <div className="col ml-n2">
                      {/* Title */}
                      <h4 className="text-body mb-1 name">Lets get ready to rumble</h4>
                      {/* Time */}
                      <p className="small text-muted mb-0">
                        <span className="fe fe-clock" />
                        <time dateTime="2018-05-24">Updated 2hr ago</time>
                      </p>
                    </div>
                  </div>
                  {/* / .row */}
                </a>
                <a href="project-overview.html" className="list-group-item px-0">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      {/* Avatar */}
                      <div className="avatar avatar-4by3">
                        <img src={Project1} alt="..." className="avatar-img rounded" />
                      </div>
                    </div>
                    <div className="col ml-n2">
                      {/* Title */}
                      <h4 className="text-body mb-1 name">Pizza Time</h4>
                      {/* Time */}
                      <p className="small text-muted mb-0">
                        <span className="fe fe-clock" />
                        <time dateTime="2018-05-24">Updated 4hr ago</time>
                      </p>
                    </div>
                  </div>
                  {/* / .row */}
                </a>
                <a href="project-overview.html" className="list-group-item px-0">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      {/* Avatar */}
                      <div className="avatar avatar-4by3">
                        <img src={Project2} alt="..." className="avatar-img rounded" />
                      </div>
                    </div>
                    <div className="col ml-n2">
                      {/* Title */}
                      <h4 className="text-body mb-1 name">Nothing to see here</h4>
                      {/* Time */}
                      <p className="small text-muted mb-0">
                        <span className="fe fe-clock" />
                        <time dateTime="2018-05-24">Updated 4hr ago</time>
                      </p>
                    </div>
                  </div>
                  {/* / .row */}
                </a>
                <a href="project-overview.html" className="list-group-item px-0">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      {/* Avatar */}
                      <div className="avatar avatar-4by3">
                        <img src={Project3} alt="..." className="avatar-img rounded" />
                      </div>
                    </div>
                    <div className="col ml-n2">
                      {/* Title */}
                      <h4 className="text-body mb-1 name">What even is this</h4>
                      {/* Time */}
                      <p className="small text-muted mb-0">
                        <span className="fe fe-clock" />
                        <time dateTime="2018-05-24">Updated 4hr ago</time>
                      </p>
                    </div>
                  </div>
                  {/* / .row */}
                </a>
                <a href="profile-posts.html" className="list-group-item px-0">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      {/* Avatar */}
                      <div className="avatar">
                        {/* <img
                            src={calvinandhobbes}
                            alt="..."
                            className="avatar-img rounded-circle"
                          /> */}
                        <img
                          src={calvinandhobbes}
                          alt="..."
                          className="avatar-img rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="col ml-n2">
                      {/* Title */}
                      <h4 className="text-body mb-1 name">Daniel Dix</h4>
                      {/* Status */}
                      <p className="text-body small mb-0">
                        <span className="text-success">●</span>
                        Online
                      </p>
                    </div>
                  </div>
                  {/* / .row */}
                </a>
                <a href="profile-posts.html" className="list-group-item px-0">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      {/* Avatar */}
                      <div className="avatar">
                        <img src={Avatar2} alt="..." className="avatar-img rounded-circle" />
                      </div>
                    </div>
                    <div className="col ml-n2">
                      {/* Title */}
                      <h4 className="text-body mb-1 name">Daniel Dix</h4>
                      {/* Status */}
                      <p className="text-body small mb-0">
                        <span className="text-danger">●</span>
                        Offline
                      </p>
                    </div>
                  </div>
                  {/* / .row */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Modal: Activity */}
    <div
      className="modal fade"
      id="sidebarModalActivity"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-vertical" role="document">
        <div className="modal-content">
          <div className="modal-header">
            {/* Title */}
            <h4 className="modal-title">Notifications</h4>
            {/* Close */}
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            {/* List group */}
            <div className="list-group list-group-flush my-n3">
              <a className="list-group-item px-0" href="#!">
                <div className="row">
                  <div className="col-auto">
                    {/* Avatar */}
                    <div className="avatar avatar-sm">
                      <img
                        src="assets/img/avatars/profiles/calvinandhobbes.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                  </div>
                  <div className="col ml-n2">
                    {/* Content */}
                    <div className="small text-muted">
                      <strong className="text-body">Daniel Dix</strong>
                      shared your post with
                      <strong className="text-body">Daniel Dix</strong>,
                      <strong className="text-body">Daniel Dix</strong>
                      and
                      <strong className="text-body">3 others</strong>.
                    </div>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">2m</small>
                  </div>
                </div>
                {/* / .row */}
              </a>
              <a className="list-group-item px-0" href="#!">
                <div className="row">
                  <div className="col-auto">
                    {/* Avatar */}
                    <div className="avatar avatar-sm">
                      <img src={Avatar2} alt="..." className="avatar-img rounded-circle" />
                    </div>
                  </div>
                  <div className="col ml-n2">
                    {/* Content */}
                    <div className="small text-muted">
                      <strong className="text-body">Daniel Dix</strong>
                      said "Wowzers"
                    </div>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">2m</small>
                  </div>
                </div>
                {/* / .row */}
              </a>
              <a className="list-group-item px-0" href="#!">
                <div className="row">
                  <div className="col-auto">
                    {/* Avatar */}
                    <div className="avatar avatar-sm">
                      <img src={Avatar3} alt="..." className="avatar-img rounded-circle" />
                    </div>
                  </div>
                  <div className="col ml-n2">
                    {/* Content */}
                    <div className="small text-muted">
                      <strong className="text-body">Daniel Dix</strong>
                      commented
                      <blockquote className="text-body">“Whoa”</blockquote>
                    </div>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">2m</small>
                  </div>
                </div>
                {/* / .row */}
              </a>
              <a className="list-group-item px-0" href="#!">
                <div className="row">
                  <div className="col-auto">
                    {/* Avatar */}
                    <div className="avatar avatar-sm">
                      <img src={Avatar4} alt="..." className="avatar-img rounded-circle" />
                    </div>
                  </div>
                  <div className="col ml-n2">
                    {/* Content */}
                    <div className="small text-muted">
                      <strong className="text-body">Daniel Dix</strong>
                      subscribed to you.
                    </div>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">2m</small>
                  </div>
                </div>
                {/* / .row */}
              </a>
              <a className="list-group-item px-0" href="#!">
                <div className="row">
                  <div className="col-auto">
                    {/* Avatar */}
                    <div className="avatar avatar-sm">
                      <img
                        src="assets/img/avatars/profiles/avatar-5.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                  </div>
                  <div className="col ml-n2">
                    {/* Content */}
                    <div className="small text-muted">
                      <strong className="text-body">Daniel Dix</strong>
                      shared your post with
                      <strong className="text-body">Daniel Dix</strong>,
                      <strong className="text-body">Daniel Dix</strong>, and
                      <strong className="text-body">3 others</strong>.
                    </div>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">2m</small>
                  </div>
                </div>
                {/* / .row */}
              </a>
              <a className="list-group-item px-0" href="#!">
                <div className="row">
                  <div className="col-auto">
                    {/* Avatar */}
                    <div className="avatar avatar-sm">
                      <img
                        src="assets/img/avatars/profiles/avatar-6.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                  </div>
                  <div className="col ml-n2">
                    {/* Content */}
                    <div className="small text-muted">
                      <strong className="text-body">Daniel Dix</strong>
                      said "Yeah!"
                    </div>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">2m</small>
                  </div>
                </div>
                {/* / .row */}
              </a>
              <a className="list-group-item px-0" href="#!">
                <div className="row">
                  <div className="col-auto">
                    {/* Avatar */}
                    <div className="avatar avatar-sm">
                      <img
                        src="assets/img/avatars/profiles/avatar-7.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                  </div>
                  <div className="col ml-n2">
                    {/* Content */}
                    <div className="small text-muted">
                      <strong className="text-body">Daniel Dix</strong>
                      commented
                      <blockquote className="text-body">“yes”</blockquote>
                    </div>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">2m</small>
                  </div>
                </div>
                {/* / .row */}
              </a>
              <a className="list-group-item px-0" href="#!">
                <div className="row">
                  <div className="col-auto">
                    {/* Avatar */}
                    <div className="avatar avatar-sm">
                      <img
                        src="assets/img/avatars/profiles/avatar-8.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                  </div>
                  <div className="col ml-n2">
                    {/* Content */}
                    <div className="small text-muted">
                      <strong className="text-body">Daniel Dix</strong>
                      subscribed to you.
                    </div>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">2m</small>
                  </div>
                </div>
                {/* / .row */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="main-content">
      <div className="container-fluid">
        {/* <Cards/> */}
        <div className="row">
          <Card title="Total Users" amount="24" iconClass="fe-user" />
          <Card title="Tests Passed" amount="23" iconClass="fe-check" />
          <Card title="Tests Pending" amount="55" iconClass="fe-clock" />
          <Card title="Tests Failed" amount="34" iconClass="fe-warning" />
          {/* / .row */}
        </div>
        <div className="row">
          <div className="row">
            <div className="col-12 col-xl-12" />
          </div>
          <div className="col-12 col-xl-12" />
        </div>
      </div>
      {/* / .row */}
    </div>
    {/* / .main-content */}
  </React.Fragment>
);

export default Dashboard;
