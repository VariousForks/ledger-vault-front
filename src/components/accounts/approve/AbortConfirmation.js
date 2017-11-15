import React from "react";
import PropTypes from "prop-types";
import { DialogButton } from "../../";
import Trash from "../../icons/thin/Trash";

function AbortConfirmation(props) {
  const { abort, aborting } = props;
  return (
    <div id="account-abort-confirmation" className="small-modal">
      <header>
        <Trash className="trash-icon" />
        <h3>Abort account</h3>
      </header>

      <div className="content">
        <p>Do you really want to abort the account ?</p>
        <p>
          The request will be cancelled and the account will not be created.
        </p>
      </div>
      <div className="footer">
        <DialogButton highlight className="cancel margin" onTouchTap={aborting}>
          Cancel
        </DialogButton>
        <DialogButton highlight right className="abort" onTouchTap={abort}>
          Abort
        </DialogButton>
      </div>
    </div>
  );
}

AbortConfirmation.propTypes = {
  abort: PropTypes.func.isRequired,
  aborting: PropTypes.func.isRequired
};

export default AbortConfirmation;