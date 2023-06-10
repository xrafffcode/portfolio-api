const Project = require('../models/project.model');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/projects'); // Tentukan direktori tempat menyimpan file gambar
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();
        cb(null, uniqueSuffix + '.' + extension);
    }
});


const getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            attributes: ['id', 'name', 'description', 'url', 'image', 'github', 'createdAt', 'updatedAt']
        });

        const projectsWithImages = projects.map(project => {
            const { id, name, description, url, image, github, createdAt, updatedAt } = project;
            return {
                id,
                name,
                description,
                url,
                image: `${req.protocol}://${req.get('host')}/images/projects/${image}`, // Menggunakan URL lengkap untuk mengambil gambar
                github,
                createdAt,
                updatedAt
            };
        });

        res.send({
            message: 'Data berhasil diambil',
            data: projectsWithImages
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
        const upload = multer({ storage: storage }).single('image');
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).send({
                    message: err.message || 'Terjadi kesalahan saat mengupload gambar.'
                });
            } else if (err) {
                return res.status(500).send({
                    message: err.message || 'Terjadi kesalahan saat mengupload gambar.'
                });
            }

            const project = await Project.create({
                name: req.body.name,
                description: req.body.description,
                url: req.body.url,
                github: req.body.github,
                image: req.file.filename
            });

            res.send({
                message: 'Data berhasil dibuat',
                data: project
            });
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
