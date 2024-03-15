import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {host_url} from '../../app/constants'

let tvScriptLoadingPromise;



const ChartFragment = (props) => {

    const chartData = useSelector((state) => state.chartData);
    
    const check = () => {
        const a = document.getElementsByClassName('.valueValue-G1_Pfvwd');
    }

    const onLoadScriptRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {



        
       


        onLoadScriptRef.current = createWidget;

        if (!tvScriptLoadingPromise) {
            tvScriptLoadingPromise = new Promise((resolve) => {
                const script = document.createElement('script');
                script.id = 'tradingview-widget-loading-script';
                script.src = 'https://s3.tradingview.com/tv.js';
                script.type = 'text/javascript';
                script.onload = resolve;

                document.head.appendChild(script);
            });
        }

        tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

        return () => onLoadScriptRef.current = null;

        function createWidget() {

            if (document.getElementById('tradingview_6628f') && 'TradingView' in window) {

                new window.TradingView.widget({
                    width: "100%",
                    height: "100%",
                    symbol: `${(chartData.exchange === ('BSE' || 'NSE'))?chartData.exchange : 'BSE' }:${chartData.symbol}`,
                    interval: "D",
                    timezone: "Asia/Kolkata",
                    theme: "light",
                    style: "1",
                    locale: "in",
                    toolbar_bg: "#f1f3f6",
                    withdateranges: true,
                    hide_side_toolbar: false,
                    enable_publishing: false,
                    allow_symbol_change: true,
                    container_id: "tradingview_6628f"
                });
                check();
            }
        }
    },[chartData]);

    return (
        <div className='tradingview-widget-container' style={{marginTop: '-1px'}}>

          <div id='tradingview_6628f' />      
        </div>

    );
}

export default ChartFragment;
