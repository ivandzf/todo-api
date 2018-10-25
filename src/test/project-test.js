const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const should = chai.should();

chai.use(chaiHttp);

const projectUrl = '/api/v1/projects';
let idDummy;
const projectDummy = {
  name: 'test project'
};

describe('Save project', () => {
  it('return must create one project', done => {
    chai
      .request(server)
      .post(projectUrl)
      .send(projectDummy)
      .end((err, res) => {
        res.should.have.status(201);
        idDummy = res.body.id;
        done();
      });
  });
});

describe('Get projects', () => {
  it('return must data projects', done => {
    chai
      .request(server)
      .get(projectUrl)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('Update project', () => {
  it('return must create update name project', done => {
    chai
      .request(server)
      .post(projectUrl + '/' + idDummy)
      .send({ name: 'change name' })
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});

describe('Delete project', () => {
  it('return must delete one project', done => {
    chai
      .request(server)
      .delete(projectUrl + '/' + idDummy)
      .send()
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});
