import { Request, Response ,NextFunction, Router} from 'express';
import { Contact } from '../model/contact';
//import { ErrorWithStatus , NotFoundError, ConflictError } from '../error/errorWithStatus';
import { asyncToResp} from './apiHandler';
import { ContactDataService } from '../core/itf/contactDataService';
import { contactService } from '../core/services';
import { mySmtpUtil } from '../util/smtp-util';

export const contactApiRouter = Router();


// .../contact-api/public/contact/1 ou ...
contactApiRouter.route('/contact-api/public/contact/:id')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction){
    let idContact = req.params.id;
    let contact = await contactService().findById(idContact)
    return contact;
}));

// http://localhost:8282/contact-api/public/contact renvoyant tout [ {} , {}]
// http://localhost:8282/contact-api/public/contact?xyz=abc renvoyant [{}] selon critere
contactApiRouter.route('/contact-api/public/contact')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction ) {
    //let  xyz = req.query.xyz;
    let contactArray = await contactService().findAll();
    /*if(xyz){
            //filtrage selon critère xyz:
        }*/
    return contactArray;
}));


//POST ... with body { .... }
contactApiRouter.route('/contact-api/private/role_admin/contact')
.post(asyncToResp(async function(req :Request, res :Response , next: NextFunction ) {
    let  contact :Contact =  req.body ; //as javascript object via jsonParser
    let savedContact = await contactService().insert(contact);
                      // await contactService.saveOrUpdate(Contact);
    if(savedContact!=null && mySmtpUtil.isInitialized()){
            mySmtpUtil.sendSimpleEmail("didier@d-defrance.fr",
                                        "nouveau contact",
                                        JSON.stringify(savedContact));
    }
    return savedContact;
}));

//PUT ... with body { .... }
contactApiRouter.route('/contact-api/private/role_admin/contact')
.put(asyncToResp(async  function(req :Request, res :Response , next: NextFunction ) {
    let  contact :Contact =  req.body ; //as javascript object
    let updatedContact = await contactService().update(contact);
    return updatedContact;
}));

// DELETE http://localhost:8282/contact-api/private/role_admin/contact/1
contactApiRouter.route('/contact-api/private/role_admin/contact/:id')
.delete(asyncToResp(async  function(req :Request, res :Response , next: NextFunction ) {
    let idContact = req.params.id;
    await contactService().deleteById(idContact)
    return{ "action" : "contact with id="+idContact + " was deleted"};
}));




