const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');
const should = chai.should();

chai.use(chaiHttp);

const projectUrl = '/api/v1/project';
const projectDumy = {
	name: 'test project'
};

describe('Save project', () => {
	it('return must create one project', done => {
		chai
			.request(server)
			.post(projectUrl)
			.send(projectDumy)
			.end((err, res) => {
				res.should.have.status(201);
				done();
			});
	});
});

describe('Get all project', () => {
	it('return must all project', done => {
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
			.get(projectUrl)
			.end((err, res) => {
				res.should.have.status(200);

				chai
					.request(server)
					.put(
						projectUrl + '/' + res.body.find(x => x.name == projectDumy.name).id
					)
					.send({ name: 'change name' })
					.end((err, res) => {
						res.should.have.status(204);
						done();
					});
			});
	});
});

describe('Delete project', () => {
	it('return must delete one project', done => {
		chai
			.request(server)
			.get(projectUrl)
			.end((err, res) => {
				res.should.have.status(200);

				chai
					.request(server)
					.delete(
						projectUrl + '/' + res.body.find(x => x.name == 'change name').id
					)
					.send()
					.end((err, res) => {
						res.should.have.status(204);
						done();
					});
			});
	});
});
