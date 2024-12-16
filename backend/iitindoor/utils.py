from django.core.mail import EmailMessage
from django.conf import settings


def get_formatted_msg(msg):
    return ( f"""
            <code>
                <h3>Repected Senior, </h3>
                <br/>
                <h2>{ msg }<h2>
                
                <br/> <br/>
                <h3> Sincerely, </h3>
                <h3> Mohammad Saikat Islam </h3>
                <h3> bsse1629@iit.du.ac.bd </h3>
                <h3> On Behave of BSSE16 </h3>
            </code>

            """ )

def send_mail_notification( subject, msg, to ):
    """
    A function for sending Email that uses EmailMessage of django
        subject -> String \n
        msg -> String \n
        to -> string address or list of strings \n
    """
    email = EmailMessage(
        subject = subject,
        body= get_formatted_msg(msg=msg),
        from_email = settings.EMAIL_HOST_USER,
        to = set(to) if type(to) is str else set(to),
    )
    email.content_subtype = 'html'
    # email.attach_file("path/to/file.pdf")
    email.send()