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
    ToastAndroid,
    Linking
} from 'react-native';
 
//获取设备的宽度和高度
let {
    height: deviceHeight,
    width: deviceWidth
} = Dimensions.get('window');

let WEBVIEW_REF = 'webview';
const URL = 'http://www.zzcredit.gov.cn/wap/';
// const URL = 'http://192.168.1.71:8080/wap/';
// const URL = 'http://192.168.1.71:8082/';


 
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

    onBackAndroid = () => {
        let wkwebview = this.refs[WEBVIEW_REF];
        
        if(this.state.url==URL){ //当前页为首页
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
            return true;
        }else{
            wkwebview.goBack();
            return true;
        }
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

    // postMessage = () => {
    //     if (this.webview) {
    //         // this.webview.postMessage('window.postMessage("Title："+document.title);');
    //         this.webview.postMessage('window.postMessage("Title："+$(\'.main .content h1\').text());');
    //     }
    // }
    
    //接收来自webview内的数据
    onMessage = e => {
        let url = e.nativeEvent.data;
        // alert(url);
        Linking.openURL('http://www.zzcredit.gov.cn'+url);
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
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
        
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    //渲染
    render() {
        let showSplashScreen=this.state.showSplashScreen
        return (
            <View style={styles.container}>
                <View style={[styles.muder, showSplashScreen ? null : {display:'none'} ]}>
                    <Image source={require('./src/assets/splashScreen.jpg')} style={{width: deviceWidth, height:deviceHeight}} />
                    <TouchableHighlight
                        style={styles.countDown}
                        underlayColor="#fff"
                        onPress={() => {this.setState({showSplashScreen:false})}}
                    >
                        <Text style={{color:'#304b65'}}>跳过 {this.state.countDown}</Text>
                    </TouchableHighlight>
                </View>

                {/*<Button enabled onPress={this.postMessage} title="发送数据到webview" />*/}
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
        flex: 1,
    },
    muder:{
    },
    countDown:{
        flex: 1,
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
        backgroundColor:'#fbfdfe',
    },
    webview:{
    }
});

AppRegistry.registerComponent('RnCreditZZ', () => RnCreditZZ);
