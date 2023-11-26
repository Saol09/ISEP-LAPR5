import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import Container from 'typedi';
import config from '../../../config';
import ICamiaoController from '../../controllers/IControllers/ICamiaoController';

const route = Router();

export default (app: Router) => {
	app.use('/camiao', route);

	const ctrl = Container.get(config.controllers.camiao.name) as ICamiaoController;

	route.post(
		'/adicionar',
		celebrate({
			body: Joi.object({
				designacao: Joi.string()
					.required()
					.regex(/(eTruck[0-9]{2})/),
				tara: Joi.number()
					.required()
					.greater(0),
				capacidadeCarga: Joi.number()
					.required()
					.greater(0),
				tempoCarregamentoRapido: Joi.number()
					.required()
					.greater(0),
				cargaMaximaBaterias: Joi.number()
					.required()
					.greater(0),
				autonomia: Joi.number()
					.required()
					.greater(0),
				matricula: Joi.string()
					.required()
					.regex(
						/([A-Z]{2}-[0-9]{2}-[0-9]{2})|([0-9]{2}-[A-Z]{2}-[0-9]{2})|([0-9]{2}-[0-9]{2}-[A-Z]{2})|([A-Z]{2}-[0-9]{2}-[A-Z]{2})/
					),
			}),
		}),
		(req, res, next) => ctrl.criarCamiao(req, res, next)
	);

	route.get('/camioesExistentes', (req, res, next) =>
		ctrl.listarCamioesExistentes(req, res, next)
	);

	route.get('/camioesAtivos', (req, res, next) => ctrl.listarCamioesAtivos(req, res, next));

	route.get('/camioesInativos', (req, res, next) =>
		ctrl.listarCamioesInativos(req, res, next)
	);

	route.put(
		'/editar',
		celebrate({
			body: Joi.object({
				designacao: Joi.string()
					.required()
					.regex(/(eTruck[0-9]{2})/),
				tara: Joi.number()
					.required()
					.greater(0),
				capacidadeCarga: Joi.number()
					.required()
					.greater(0),
				tempoCarregamentoRapido: Joi.number()
					.required()
					.greater(0),
				cargaMaximaBaterias: Joi.number()
					.required()
					.greater(0),
				autonomia: Joi.number()
					.required()
					.greater(0),
				matricula: Joi.string().required(),
				ativo: Joi.boolean().required(),
			}),
		}),
		(req, res, next) => ctrl.editarCamiao(req, res, next)
	);
};
