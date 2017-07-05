let WINDOW_WIDTH = Dimensions.get('window').width;
let WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    bg: {
        width: WINDOW_WIDTH, 
        height: WINDOW_HEIGHT
    }
});

export default class Lang extends Component {
    // 在UI初始化渲染结束后，系统自动调用此函数。主要是用于定时器、网络请求
    componentDidMount() {
        setTimeout(
            () => {

            }, 3000
        );
    }

    render() {
        return ( 
            <View style = {{flex:1}}>
                <Image 
                source = {require('./assets/splashScreen.jpg')}
                style={styles.bg}
                resizeMode={'cover'}
                /> 
            </View >
        )
    }
}
