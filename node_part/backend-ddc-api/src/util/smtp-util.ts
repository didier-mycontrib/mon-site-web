
var nodemailer = require('nodemailer');
var fs = require('fs'); 

export class MySmtpUtil {

mySrcEmail :string='didier@d-defrance.fr';
myDestEmail :string = 'didier@d-defrance.fr';  
smtpPwd :string = null;

transporter :any = null;

initSmtpTransporter(){
  this.transporter = nodemailer.createTransport({
    host: 'mail.gandi.net',
    auth: {
      user: this.mySrcEmail,
      pass: this.smtpPwd
    }
  });
}

public sendSimpleEmail( destinataire:string , sujet:string , texte :string, isHtml :boolean =false , emetteur:string = this.mySrcEmail  ){
      
    var mailOptions = isHtml?{
      from: emetteur,
      to: destinataire,
      subject: sujet,
      html: texte
    }:{
      from: emetteur,
      to: destinataire,
      subject: sujet,
      text: texte
    };

    this.transporter.sendMail(mailOptions, function(error:any, info:any){
      if (error) {
        console.log(error);
      } else {
        //console.log('Email sent: ' + info.response);
      }
    }); 
}
public getSmtpPwdAndInitSmtpTransporter(){
  fs.readFile('./my-smtp.pwd', 'utf8', 
     (err:any, data:any) => {
          if (err){
            console.log(err);
          }else{
          console.log('OK:./my-smtp.pwd');
          this.smtpPwd = data;
          this.initSmtpTransporter();
          }
        });
}

isInitialized():boolean{
   return (this.transporter != null);
}

};//end of class


export const mySmtpUtil = new MySmtpUtil();