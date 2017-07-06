/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    View,
    Image,
    Button,
    WebView,
    TouchableHighlight,
    Text,
    Platform,
    PixelRatio,
    BackHandler,
    // ToastAndroid,
    Linking
} from 'react-native';
 
//获取设备的宽度和高度
let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

let WEBVIEW_REF = 'webview';
// const URL = 'http://www.zzcredit.gov.cn/wap/';
// const URL = 'http://192.168.1.71:8080/wap/';
const URL = 'http://192.168.1.71:8082/';


 
//默认应用的容器组件
class RnCreditZZ extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        url:URL,
        showSplashScreen:true,
        countDown:3
      };
    }

    _onNavigationStateChange(navState) {
        this.setState({
            url: navState.url,
            // title: navState.title,
            // loading: navState.loading,
            // isBackButtonEnable: navState.canGoBack,
            // isForwardButtonEnable: navState.canGoForward,
        })
    }

    _hideSplashScreen() {
        this.timer && clearInterval(this.timer);
        this.setState({showSplashScreen:false});
    }
    
    //接收来自webview内的数据
    onMessage = e => {
        let url = e.nativeEvent.data;
        // alert(url);
        Linking.openURL('http://www.zzcredit.gov.cn'+url);
    }

    componentDidMount(){
        let _this=this;
        let countDown=_this.state.countDown;
        _this.timer = setInterval(() => {

            if(_this.state.countDown<=0){
                clearInterval(_this.timer);
                _this.setState({
                    showSplashScreen:false
                });
            }else{
                countDown=countDown-1
                _this.setState({
                    countDown:countDown
                });
            }
        },1000);
    }

    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearInterval(this.timer);
    }

    //渲染
    render() {
        let showSplashScreen=this.state.showSplashScreen

        return (
            <View style={styles.container}>
                <View style={[styles.muder, showSplashScreen ? null : {zIndex:-1} ]}>
                    <Image source={require('./src/assets/splashScreen.jpg')} style={{width: deviceWidth, height:deviceHeight}} />
                    <TouchableHighlight
                        style={styles.countDown}
                        underlayColor="#fff"
                        onPress={this._hideSplashScreen.bind(this)}
                    >
                        <Text style={{color:'#304b65'}}>跳过 {this.state.countDown}</Text>
                    </TouchableHighlight>
                </View>

                <WebView bounces={false}
                    ref={WEBVIEW_REF}
                    // ref={ webview => { this.webview = webview; } }
                    scalesPageToFit={true}
                    // startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}

                    injectedJavaScript="document.addEventListener('message', function(e) {eval(e.data);});"
                    onMessage={this.onMessage}

                    source={{uri:URL}}
                    style={[styles.webview,{width:deviceWidth, height:deviceHeight}]}>
                </WebView>
            </View>
        )
        
    }
}
 
//样式定义
const styles = StyleSheet.create({
    container: {
        marginTop:20,
        flex: 1,
    },
    muder:{
        position:'absolute',
        left:0,
        right:0,
        top:0,
        bottom:0,
        zIndex:1
    },
    countDown:{
        alignItems:'center',
        justifyContent: 'center',
        position:'absolute',
        right:10,
        top:10,
        width:50,
        height:50,
        borderRadius: 25,
        borderWidth: (Platform.OS==='ios' ? 1.0 : 1.5) / PixelRatio.get(),
        borderColor: '#304b65',
        backgroundColor:'#fbfdfe'
    },
    webview:{
    }
});

AppRegistry.registerComponent('RnCreditZZ', () => RnCreditZZ);
