import { trackEvent } from "../../utils/firebase/firebase.utils";

import Fab from "@mui/material/Fab"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsappButton = () => {

    const handleClick = () => {
        // Track clicks on Whatsapp Button in Google Analytics events
        // Removed event name in Google Analytics
        trackEvent("");
    };
    return (<Fab
        color="primary"
        aria-label="open-chat"
        style={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            backgroundColor: "#25D366"
        }}
        href="" // Removed: WhatsApp link
        onClick={handleClick}
    >
        <WhatsAppIcon />
    </Fab>)
}

export default WhatsappButton;