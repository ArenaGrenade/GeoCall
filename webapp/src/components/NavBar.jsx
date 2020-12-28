import { useState } from 'react'
import {
    Navbar,
    NavbarBrand,
    UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAsia, faLink } from '@fortawesome/free-solid-svg-icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export const NavBar = (props) => {
    const code = props.code;
    const [codeCopied, setCodeCopied] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    return (
        <Navbar dark color="transparent" className="justify-content-start">
            <NavbarBrand>
                <FontAwesomeIcon icon={faGlobeAsia} className="mr-2" />
                GeoCall
            </NavbarBrand>

            <CopyToClipboard text={code} onCopy={() => { setCodeCopied(true); setLinkCopied(false); }}>
                <span id="code-copied" className="px-1 mx-2">{ `#${code}` }</span>
            </CopyToClipboard>
            <UncontrolledTooltip placement="bottom" target="code-copied">
                <span>{ codeCopied ? "Code Copied!" : "Copy Code." }</span>
            </UncontrolledTooltip>

            <CopyToClipboard text={window.location.href} onCopy={() => { setLinkCopied(true); setCodeCopied(false); }}>
                <button type="button" className="regenerate-btn mx-2 btn btn-outline-light btn-sm d-none d-sm-block" id="link-copied">
                    <FontAwesomeIcon icon={faLink} />
                </button>
            </CopyToClipboard>
            <UncontrolledTooltip placement="bottom" target="link-copied">
                <span className="d-none d-sm-block">{ linkCopied ? "Link Copied!" : "Copy Link." }</span>
            </UncontrolledTooltip>
        </Navbar>
    );
}