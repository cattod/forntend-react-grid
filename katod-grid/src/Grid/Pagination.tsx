import React , {Component} from "react"

export class Pagination extends Component {
    render() {
        return(
            <div className="test-header">
            <div>
              <button 
            //  onClick={this.onBtFirst.bind(this)}
              >To First</button>
              <button 
             // onClick={this.onBtLast.bind(this)}
               id="btLast">
                To Last
              </button>
              <button 
              //onClick={this.onBtPrevious.bind(this)}
              >To Previous</button>
              <button
               //onClick={this.onBtNext.bind(this)}
               >To Next</button>
              <button 
            // onClick={this.onBtPageFive.bind(this)}
              >To Page 5</button>
              <button 
             // onClick={this.onBtPageFifty.bind(this)}
              >To Page 50</button>
            </div>

            <div style={{ marginTop: "6px" }}>
              <span className="label">Last Page Found:</span>
              <span className="value" id="lbLastPageFound">
                -
              </span>
              <span className="label">Page Size:</span>
              <span className="value" id="lbPageSize">
                -
              </span>
              <span className="label">Total Pages:</span>
              <span className="value" id="lbTotalPages">
                -
              </span>
              <span className="label">Current Page:</span>
              <span className="value" id="lbCurrentPage">
                -
              </span>
            </div>
          </div>
        )
    }
}