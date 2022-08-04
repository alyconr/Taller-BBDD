import ProjectsService from './service';
import { HttpError } from '@/config/error';
import { IProjectsModel } from './model';
import { NextFunction, Request, Response } from 'express';

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const aboutMeArray: IProjectsModel[] = await ProjectsService.findAll();

        res.status(200).json(aboutMeArray);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const aboutMe: IProjectsModel = await ProjectsService.findOne(req.params.id);

        res.status(200).json(aboutMe);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const aboutMe: IProjectsModel = await ProjectsService.insert(req.body);

        res.status(201).json(aboutMe);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}

// TODO: 5) Create a update method
// HINT: This could be done in several ways, one straighfowrard way is to remove the old object and create a new one with the modified data.

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
 export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await ProjectsService.remove(req.body._id);
        delete req.body._id;
        const aboutMe: IProjectsModel = await ProjectsService.insert(req.body);

        res.status(201).json(aboutMe);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}


/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const aboutMe: IProjectsModel = await ProjectsService.remove(req.body.id);

        res.status(200).json(aboutMe);
    } catch (error) {
        next(new HttpError(error.message.status, error.message));
    }
}
