import React, { useLayoutEffect, useState } from "react";
import {createPortal} from "react-dom";

const PortalUsername = ({children, wrapperId="portal-wrapper"}) => {

    const [wrapperElement, setWrapperElement] = useState(null);
    let element = document.getElementById(wrapperId);

    function createWrapperAndAppendToBody(wrapperId){
        const wrapperElement = document.createElement("div");
        wrapperElement.setAttribute("id", wrapperId);
        document.body.appendChild(wrapperElement);
        return wrapperElement;
    };

    useLayoutEffect(() => {
        //if the DOM element doens't exist it will be created and appended to the body after
        let element = document.getElementById(wrapperId);
        let systemCreated = false;

        if(!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        };

        setWrapperElement(element);

        return () => {
            //delete the programatically created element    
            if(systemCreated && element.parentNode){
                element.parentNode.removeChild(element);
            };
        };

    }, [wrapperId]);

    if(wrapperElement === null) return null;

    return createPortal(children, element);
};

export default PortalUsername;