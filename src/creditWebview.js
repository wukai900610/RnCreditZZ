/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    WebView,
    Platform,
    BackHandler,
    ToastAndroid
} from 'react-native';
 
//获取设备的宽度和高度
let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

let WEBVIEW_REF = 'webview';
const URL = 'http://www.zzcredit.gov.cn/wap/';
 
//默认应用的容器组件
export default class CreditWebview extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        url:URL
      };
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    onBackAndroid = () => {
        let wkwebview = this.refs[WEBVIEW_REF];
        
        if(this.state.url==URL){
            return false;//默认行为
        }else{
            // ToastAndroid.show('再点击一次退出APP',ToastAndroid.SHORT);
            wkwebview.goBack();
            return true;
        }

    }

    _onNavigationStateChange(navState) {
        // alert(navState.url)
        this.setState({
            url: navState.url,
            // title: navState.title,
            // loading: navState.loading,
            // isBackButtonEnable: navState.canGoBack,
            // isForwardButtonEnable: navState.canGoForward,
        })
    }

    //渲染
    render() {
        return (
            <View style={styles.container}>
                
                <WebView bounces={false}
                    ref={WEBVIEW_REF}

                    scalesPageToFit={true}
                    // startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}

                    source={{uri:URL}}
                    style={{width:deviceWidth, height:deviceHeight}}>
                </WebView>
            </View>
        );
    }
}
 
//样式定义
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});


