import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import ContactForm from "../../components/contact-form/contact-form.component";

const ContactUs = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" marginBottom="10px">
        Contact Us
      </Typography>
      <Typography marginBottom="5px">
        Feel free to contact us on work orders for your kitchen or balcony
        renovation.
      </Typography>

      <Typography marginBottom="5px">
        For toilet work orders, please browse and book from our standard
        catalogue online <Link href="shop">here</Link> to lock in your booking.
        If you can’t find your desired product, we’d be happy to assist you!
      </Typography>
      <Grid container spacing={2} padding="30px 0px">
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" marginBottom="10px">
            How to Reach Us
          </Typography>
          <Typography marginBottom="5px">
            Phone: <Link href="https://wa.link/porouswaysg">+65 8825 8000</Link>
          </Typography>
          <Typography marginBottom="5px">
            Email: info@intersurface.com
          </Typography>
          <Typography marginBottom="5px">Address: </Typography>
          <Typography marginBottom="5px">153 Kampong Ampat </Typography>
          <Typography marginBottom="5px">
            #03-03 Jun Jie Industrial Building
          </Typography>
          <Typography marginBottom="5px">Singapore 368326 </Typography>
          <Typography marginBottom="5px">
            If you would like to view our showroom, please book an appointment
            with us.
          </Typography>
          <ContactForm/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7367280462604!2d103.88008107565506!3d1.3341438986532081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da178e4b946ef1%3A0x393ec20549663ea1!2sPorousway%20Pte%20Ltd!5e0!3m2!1sen!2ssg!4v1691308428373!5m2!1sen!2ssg"
            width="100%"
            height="450px"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;
