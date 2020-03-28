import React from 'react';
import { connect } from 'react-redux';

import { IHome } from 'src/helpers/interfaces';

const mapStateToProps = ( state: IHome ) => ({
  loading: state.home.loading,
});

const Preloader = (props: any) => {
  const { loading } = props;
  return loading && <div className="load-wrapp" >
      <div className="load-5">
          <div className="ring-2">
              <div className="ball-holder">
                  <div className="ball"></div>
              </div>
          </div>
      </div>
    </div>
};

export default connect(mapStateToProps)(Preloader)