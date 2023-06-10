const Project = require('../models/project.model');

const getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.send({
            message: 'Data berhasil diambil',
            data: projects
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Terjadi kesalahan saat mengambil data proyek.'
        });
    }
};



const getProject = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).send({
                message: `Data proyek dengan id=${id} tidak ditemukan.`
            });
        }

        res.send({
            message: 'Data berhasil diambil',
            data: project
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || `Terjadi kesalahan saat mengambil data proyek dengan id=${id}`
        });
    }
}

const createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.send({
            message: 'Data berhasil ditambahkan',
            data: project
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || 'Terjadi kesalahan saat membuat proyek baru.'
        });
    }

}

const updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).send({
                message: `Data proyek dengan id=${id} tidak ditemukan. Tidak ada yang diupdate.`
            });
        }

        await Project.update(req.body, {
            where: { id: id }
        });

        res.send({
            message: 'Data berhasil diupdate',
            data: await Project.findByPk(id)
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || `Terjadi kesalahan saat mengupdate data proyek dengan id=${id}`
        });
    }
}

const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const project = await Project.findByPk(id);

        if (!project) {
            return res.status(404).send({
                message: `Data proyek dengan id=${id} tidak ditemukan. Tidak ada yang dihapus.`
            });
        }

        await Project.destroy({
            where: { id: id }
        });

        res.send({
            message: 'Data berhasil dihapus'
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || `Terjadi kesalahan saat menghapus data proyek dengan id=${id}`
        });
    }
};



module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
};
