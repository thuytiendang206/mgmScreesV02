import React from 'react';
import './FooterStyles.css';
class Footer extends React.Component {
    render() {
        const { styles } = this.props;
        return (
            <div className="footer-wrapper row" style={styles}>
                <div className="footer-left col-md-5">
                    <h3><span>mgm Technology Partners Vietnam</span></h3>
                    <p className="footer-company-name">Copyright 2018 © mgm Internship 2017. All rights reversed</p>
                </div>
                <div className="footer-center col-md-4">
                    <div>
                        <i className="fa fa-map-marker "></i>
                        <p><span>7 Pasteur Str, Hai Chau Dist</span> Da Nang City, Vietnam</p>
                    </div>
                    <div>
                        <i className="fa fa-phone "></i>
                        <p>0236 3531 773</p>
                    </div>

                </div>
                <div className="footer-right col-md-3">
                    <div className="mail-icon"> 
                        <i className="fa fa-envelope "></i>
                        <p><a href="mailto:support@company.com">Binh.Phan@mgm-tp.com</a></p>
                    </div>
                    <div className="footer-icons">
                        <a href="https://www.facebook.com/mgmTechnologyPartnersVietnam/"><i className="fa fa-facebook"></i></a>
                        <a href="https://twitter.com/mgm_tp"><i className="fa fa-twitter"></i></a>
                        <a href="https://www.linkedin.com/company/mgm-technology-partners-gmbh"><i className="fa fa-linkedin"></i></a>
                        <a href="https://github.com/mgm-tp"><i className="fa fa-github"></i></a>
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer;