import modalStyles from "./modal.module.css";
const Modal = () => {
    return (
        <div className={modalStyles.modalWrapper}>
            <div className={modalStyles.modalContainer}>
                <div className={modalStyles.imageAndLogoContainer}>
                    <div className={modalStyles.logoContainer}>
                        <h1>Tomás Pereira</h1>
                    </div>
                    <div className={modalStyles.imageContainer}>

                    </div>
                </div>
                <div className={modalStyles.loginContainer}>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <div className={modalStyles.ButtonAndRegisterLinkContainer}>
                        <a href="www.blackpeoplemeet.com">Register</a>
                        <button>Log in</button>
                    </div>
                    <button>Login with google</button>
                </div>
            </div>
        </div>
    )
}; 

export default Modal;