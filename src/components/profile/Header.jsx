import PropTypes from "prop-types"
import { ReactComponent as BirthdayCake } from "img/BirthdayCake.svg";
import { ReactComponent as Clock } from "img/Clock.svg";
import { ReactComponent as Location } from "img/Location.svg";
import { ReactComponent as Signature } from "img/Signature.svg";
import { sortedNeighbourhoods } from "src/utils/extractNeighbourhoods.js";
import { getBadge } from "src/utils/getBadge.js";
import { getInitials } from "src/utils/getInitials.js";
import { timeAgo } from "src/utils/timeAgo.js";
import { transformName } from "src/utils/transformName.js";

function Header({
  user,
  handleChangeClick,
  changeDetails,
  formRef,
  onChange,
  authInfo,
  onLogout,
}) {
  return (
    <header>
      <div className="badge-wrapper">
        <div className="badge-wrapper__latest-badge" title="Rank">
          <img
            src={getBadge(user?.rank || 1)?.path}
            alt="latest badge"
            className="badge-wrapper__img"
          />
        </div>
        <p className="badge-wrapper__rank-name">
          {getBadge(user?.rank || 1)?.name}
        </p>
      </div>
      <div className="profile-info">
        <div className="profile-info__heading-wrapper">
          <h1 className="profile-info__heading">{user?.name}</h1>
          <p
            className="profile-info__update-text-btn"
            onClick={handleChangeClick}
          >
            {changeDetails && user.name ? "Save" : "update"}
          </p>
        </div>
        <div className="profile-info__item">
          <BirthdayCake width="25px" height="25px" fill={"#e2e8f0"} />
          <p className="profile-info__text">
            Member since : {timeAgo(authInfo.creationTime)}
          </p>
        </div>
        <div className="profile-info__item">
          <Clock width="25px" height="25px" fill={"#e2e8f0"} />
          <p className="profile-info__text">
            Last seen : {timeAgo(authInfo.lastSignInTime)}
          </p>
        </div>
        <form className="profile-info__form" ref={formRef}>
          <fieldset
            className={`profile-info__fieldset${
              changeDetails ? " profile-info__fieldset--show-border" : ""
            }`}
          >
            <legend className="profile-info__legend ">
              {changeDetails ? "Update In Progress" : null}
            </legend>
            <div className="profile-info__item">
              <Location width="25px" height="25px" fill={"#e2e8f0"} />

              <select
                className="profile-info__select"
                value={user.location}
                id="location"
                name="location"
                onChange={onChange}
                disabled={!changeDetails}
                required
              >
                <option className="profile-info__text" value="">
                  Where are you from?
                </option>
                {sortedNeighbourhoods.map((aNeighbourhood) => (
                  <option
                    key={aNeighbourhood}
                    value={aNeighbourhood}
                    className="profile-info__text"
                  >
                    {aNeighbourhood}
                  </option>
                ))}
              </select>
            </div>
            <div className="profile-info__item">
              <Signature width="25px" height="25px" fill={"#e2e8f0"} />
              <p className="profile-info__text profile-info__text--keep-all">
                Signature:
              </p>

              {user?.signature && !changeDetails ? (
                <p className="profile-info__text">{user.signature}</p>
              ) : (
                <div className="profile-info__signature-wrapper">
                  <input
                    className="fieldset_input"
                    type="radio"
                    title="signature style"
                    id="signature1"
                    name="signature"
                    value={transformName(authInfo?.name)}
                    onChange={onChange}
                    required
                  />
                  <label
                    className="profile-info__label"
                    htmlFor="signatureShort"
                  >
                    {user?.name
                      ? transformName(authInfo?.name)
                      : transformName("John Doe") + "\n(example)"}
                  </label>
                  <input
                    className="fieldset_input"
                    type="radio"
                    title="signature style"
                    name="signature"
                    id="signature2"
                    value={getInitials(authInfo?.name)}
                    onChange={onChange}
                    required
                  />
                  <label
                    className="profile-info__label"
                    htmlFor="signatureInitials"
                  >
                    {user?.name
                      ? getInitials(authInfo?.name)
                      : getInitials("John Doe") + "(example)"}
                  </label>
                </div>
              )}
            </div>
          </fieldset>
        </form>
      </div>

      <button className="logout" onPointerDown={onLogout}>
        Log Out
      </button>
    </header>
  );
}

Header.propTypes = {
  authInfo: PropTypes.shape({
    creationTime: PropTypes.string,
    lastSignInTime: PropTypes.string,
    name: PropTypes.string
  }),
  changeDetails: PropTypes.bool,
  formRef: PropTypes.object,
  handleChangeClick: PropTypes.func,
  onChange: PropTypes.func,
  onLogout: PropTypes.func,
  user: PropTypes.shape({
    location: PropTypes.any,
    name: PropTypes.any,
    rank: PropTypes.number,
    signature: PropTypes.any
  })
}
export default Header;

