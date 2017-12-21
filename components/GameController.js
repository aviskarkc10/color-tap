import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Hole from './Hole';

class GameController extends Component {
    constructor(){
        super();
        this.state = {
            holes: [],
            score: 0,
            game: true,
        }
        this.initialState = this.state;
    }

    reloadGame = () => {
        this.setState(this.initialState)
        this.initialiseHoles();
        this.game();
    }

    initialiseHoles = () => {
        let top = 100;
        let left = 40;
        let tempHoles = [];
        
        for(let i=0; i<9; i++){
            let temp = {
                top: top,
                left: left,
                color: 'yellow',
            }

            top += 100

            if(i === 2){
                top = 100
                left = 150
            }
            else if(i === 5){
                top = 100
                left = 250
            }

            tempHoles.push(temp)
            
            if(i === 5){
                this.setState({
                    holes: tempHoles
                })
            }
        }
    }

    game = () => {
        let timeInterval = 1000;
        let interval = setInterval(() => {
            let index;
            let score = this.state.score;
            let temp = this.state.holes;
            this.setState({
                holes: temp
            })

            if(this.state.score === 5){
                timeInterval = 700;
            }
            else if(this.state.score === 10){
                timeInterval = 500;
            }
            let blink = setInterval(() => {
                temp[index].color = 'yellow' 
                if(this.state.score === score){
                    this.setState({
                        game: false
                    })
                }           
                this.setState({
                    holes: temp
                })
                clearInterval(blink)
            }, timeInterval)

            index = Math.floor(Math.random() * 9)
            temp[index].color = 'red'
            this.setState({
                holes: temp
            })
            if(!this.state.game){
                clearInterval(interval)
                this.reloadGame();
            }
        }, 3000)
    }

    btnPressed = (index) => {
        if(this.state.holes[index].color === 'red'){
            this.setState(previousState => {
                return {
                    score: previousState.score + 1
                }
            });
        }
        else{
            this.setState({
                game: false
            })
        }
    }

    componentWillMount(){
        this.initialiseHoles()
        this.game();
    }

    render(){
        
        return(
            <View>
                <Text style = {styles.text}>TAP THE RED CIRCLE</Text>
                {
                    this.state.holes.map((hole, index) => {
                        return(
                            <Hole key = {index} properties = {hole} id = {index} handlePress={this.btnPressed} />
                        );
                    })   
                }
                <View style={styles.score}>
                    <Text style = {{ fontSize: 40 }}> Score: {this.state.score} </Text>                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 20
    },
    score: {
        position: 'absolute',
        top: 500,
        left: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: 'center', 
        alignItems: 'center',
    }

})

export default GameController;