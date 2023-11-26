import { NextFunction, Request, Response } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import ICamiaoDTO from '../dto/ICamiaoDTO';
import ICamiaoService from '../services/IServices/ICamiaoService';
import ICamiaoController from './IControllers/ICamiaoController';

@Service()
export default class CamiaoController implements ICamiaoController {
	constructor(
		@Inject(config.services.camiao.name)
		private camiaoServiceInstance: ICamiaoService
	) {}

	public async criarCamiao(req: Request, res: Response, next: NextFunction) {
		try {
			const camiaoOrError = (await this.camiaoServiceInstance.criarCamiao(
				req.body as ICamiaoDTO
			)) as Result<ICamiaoDTO>;

			if (camiaoOrError.isFailure) {
				return res.status(403).json(camiaoOrError.error);
			}

			const camiaoDTO = camiaoOrError.getValue();
			return res.status(201).json(camiaoDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async listarCamioesExistentes(req: Request, res: Response, next: NextFunction) {
		try {
			const camioesOrError = (await this.camiaoServiceInstance.listarCamioesExistentes()) as Result<
				ICamiaoDTO[]
			>;

			if (camioesOrError.isFailure) {
				return res.status(402).json(camioesOrError.error);
			}

			const camioesDTO = camioesOrError.getValue();
			return res.status(201).json(camioesDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async listarCamioesAtivos(req: Request, res: Response, next: NextFunction) {
		try {
			const camioesOrError = (await this.camiaoServiceInstance.listarCamioesAtivos()) as Result<
				ICamiaoDTO[]
			>;

			if (camioesOrError.isFailure) {
				return res.status(402).json(camioesOrError.error);
			}

			const camioesDTO = camioesOrError.getValue();
			return res.status(201).json(camioesDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async listarCamioesInativos(req: Request, res: Response, next: NextFunction) {
		try {
			const camioesOrError = (await this.camiaoServiceInstance.listarCamioesInativos()) as Result<
				ICamiaoDTO[]
			>;

			if (camioesOrError.isFailure) {
				return res.status(402).json(camioesOrError.error);
			}

			const camioesDTO = camioesOrError.getValue();
			return res.status(201).json(camioesDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async editarCamiao(req: Request, res: Response, next: NextFunction) {
		try {
			const camiaoOrError = (await this.camiaoServiceInstance.editarCamiao(
				req.body as ICamiaoDTO
			)) as Result<ICamiaoDTO>;

			if (camiaoOrError.isFailure) {
				return res.status(402).json(camiaoOrError.error);
			}
			const camiaoDTO = camiaoOrError.getValue();
			return res.status(200).json(camiaoDTO);
		} catch (e) {
			return next(e);
		}
	}
}
