import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import IPercursoController from '../../controllers/IControllers/IPercursoController';

const route = Router();

export default (app: Router) => {
	app.use('/percurso', route);

	const ctrl = Container.get(
		config.controllers.percurso.name
	) as IPercursoController;

	route.post(
		'/adicionar',
		celebrate({
			body: Joi.object({
				armazemPartida: Joi.string().required(),
				armazemChegada: Joi.string().required(),
				distancia: Joi.number().required(),
				tempoPercurso: Joi.number().required(),
				tempoExtra: Joi.number().required(),
				energiaGasta: Joi.number().required(),
			}),
		}),
		(req, res, next) => ctrl.criarPercurso(req, res, next)
	);

	route.get('/percursosExistentes', (req, res, next) =>
		ctrl.getPercursosExistentes(req, res, next)
	);

	route.get('/listAllPercursos', (req, res, next) => {
		ctrl.getAllPercursos(req, res, next);
	  });
	  

	route.get('/percursosArmazemPartida/:idArmazem', (req, res, next) => {
		ctrl.getPercursosByArmazemPartida(req, res, next);
		req.params.idArmazem;
	});

	route.get('/percursosArmazemChegada/:idArmazem', (req, res, next) => {
		ctrl.getPercursosByArmazemChegada(req, res, next);
		req.params.idArmazem;
	});

	route.get(
		'/percursosPorArmazens/:idArmazemP/:idArmazemC',
		(req, res, next) => {
			ctrl.getPercursosByArmazens(req, res, next);
			req.params.idArmazemP;
			req.params.idArmazemC;
		}
	);

	route.put(
		'/editar',
		celebrate({
			body: Joi.object({
				armazemPartida: Joi.string().required(),
				armazemChegada: Joi.string().required(),
				distancia: Joi.number().required(),
				tempoPercurso: Joi.number().required(),
				tempoExtra: Joi.number().required(),
				energiaGasta: Joi.number().required(),
			}),
		}),
		(req, res, next) => ctrl.editarPercurso(req, res, next)
	);
};
