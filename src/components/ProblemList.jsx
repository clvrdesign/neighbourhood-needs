import { getBadgePaths } from "utils/getBadgePaths.js";

function ProblemList() {
  return (
    <section>
      <ul className="problems">
        <li className="one-problem">
          <p>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large.
          </p>
          <a
            className="evidence"
            href="https://www.historic-uk.com/HistoryUK/HistoryofBritain/The-Shortest-War-in-History/#:~:text=The%20little%20known%20Anglo%2DZanzibar,Britain%20and%20Germany%20in%201890."
            target="_blank"
            rel="noreferrer"
          >
            (Evidence)
          </a>
          <div className="tag">Longdenville</div>
          <div className="post-metrics">
            <div className="vote-btns">
              <button>👍 500</button>
              <button>👎1.5K</button>
              <button>🚩10</button>
            </div>
            <div className="author-stats">
              <div className="report-date" title="reported date">
                reported May 10, 2022 at 21:03
              </div>
              <div className="report-author">
                <div className="author-badge">
                
                  <img
                    src={getBadgePaths("newcomer")}
                    alt=""
                    title="author rank"
                  />
                </div>
                <div className="author-name" title="author name">
                  M.Henry
                </div>
              </div>
              <div className="report-stats">
                <span className="reputation-score" title="reputation score">
                  17.5k
                </span>
                <div className="badges">
                  <span className="badge-gold-stats" title="gold badges">
                    <span className="badge badge--gold"></span>
                    <span className="badge-count">13</span>
                  </span>
                  <span className="badge-gold-stats" title="silver badges">
                    <span className="badge badge--silver"></span>
                    <span className="badge-count">13</span>
                  </span>
                  <span className="badge-gold-stats" title="bronze badges">
                    <span className="badge badge--bronze"></span>
                    <span className="badge-count">13</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="one-problem">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            officia mollitia accusamus.
          </p>
          <div className="tag">Montrose</div>
          <div className="vote-btns">
            <button>👍</button>
            <button>👎</button>
            <button>🚩</button>
          </div>
        </li>
        <li className="one-problem">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            officia mollitia accusamus.
          </p>
          <div className="tag">Freeport</div>
          <div className="vote-btns">
            <button>👍</button>
            <button>👎</button>
            <button>🚩</button>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default ProblemList;
