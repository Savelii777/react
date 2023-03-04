import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addShot} from "../store/actions/actionsShots";
import {useShots} from "./shots";

const width = 400
const height = 400

export function useDots() {

    const {shots: dots, pageSizeIsExhausted, lastPageOffset, pageSize, offset, token} = useShots()
    const radius = useSelector(state => state.radius.value)
    const dispatch = useDispatch()

    function clickHandler(event) {
        const canvas = document.getElementById("area-image")
        const canvasCenterTop = canvas.offsetTop + canvas.offsetHeight / 2;
        const canvasCenterLeft = canvas.offsetLeft + canvas.offsetWidth / 2;

        // X, Y, R - px
        let X = event.pageX - canvasCenterLeft
        let Y = -(event.pageY - canvasCenterTop)
        let R = canvas.width / 3

        // x, y, r - numeric
        let r = radius
        let x = Math.round(X * r / R * 1000000) / 1000000
        let y = Math.round(Y * r / R * 1000000) / 1000000

        dispatch(addShot({x, y, r}, pageSizeIsExhausted, lastPageOffset, pageSize, offset, token))
    }

    useEffect(() => {
        drawOnCanvas()
    }, [])

    useEffect(() => {
        clearCanvas()
        drawOnCanvas()
        drawDots(dots)
    }, [dots])

    return {width, height, clickHandler}
}

function clearCanvas() {
    document.getElementById("area-image").getContext('2d')
        .clearRect(0, 0, width, height)
}

function drawDots(dots) {

    for (const dot of dots) {

        const canvas = document.getElementById("area-image")
        let R = canvas.width / 3

        let X = Number(dot.x) * R / dot.r
        let Y = Number(dot.y) * R / dot.r
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d')
            if (dot.inside === true) {
                ctx.fillStyle = 'rgba(85,255,0)'
            } else {
                ctx.fillStyle = 'rgba(255,25,20)'
            }
            ctx.beginPath()
            ctx.arc(X + canvas.offsetWidth / 2, -Y + canvas.offsetHeight / 2,
                4, 0, 2 * Math.PI)
            ctx.fill()
        }
    }
}

function drawOnCanvas() {
    const canvas = document.getElementById("area-image");
    if (!canvas) return
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d')
        const indent = 6
        const height = canvas.height
        const width = canvas.width
        const centerX = width / 2
        const centerY = height / 2
        const R = width / 3
        ctx.lineWidth = 2
        ctx.lineJoin = 'round'

        function drawAxes() {
            ctx.beginPath()
            let arrowWidth = 5
            let arrowLength = 10

            //x
            ctx.moveTo(indent, height / 2)
            ctx.lineTo(width - indent, height / 2)
            ctx.lineTo(width - indent - arrowLength, height / 2 - arrowWidth)
            ctx.moveTo(width - indent, height / 2)
            ctx.lineTo(width - indent - arrowLength, height / 2 + arrowWidth)

            //y
            ctx.moveTo(width / 2, height - indent)
            ctx.lineTo(width / 2, indent)
            ctx.lineTo(width / 2 + arrowWidth, indent + arrowLength)
            ctx.moveTo(width / 2, indent)
            ctx.lineTo(width / 2 - arrowWidth, indent + arrowLength)

            ctx.stroke()
        }

        function drawMarks() {
            let markLength = 3

            ctx.beginPath()

            //x
            ctx.moveTo(centerX + R / 2, centerY - 2 * markLength)
            ctx.lineTo(centerX + R / 2, centerY + 2 * markLength)
            ctx.moveTo(centerX + R, centerY - 2 * markLength)
            ctx.lineTo(centerX + R, centerY + 2 * markLength)
            ctx.moveTo(centerX - R / 2, centerY - 2 * markLength)
            ctx.lineTo(centerX - R / 2, centerY + 2 * markLength)
            ctx.moveTo(centerX - R, centerY - 2 * markLength)
            ctx.lineTo(centerX - R, centerY + 2 * markLength)

            //y
            ctx.moveTo(centerX - 2 * markLength, centerY - R / 2)
            ctx.lineTo(centerX + 2 * markLength, centerY - R / 2)
            ctx.moveTo(centerX - 2 * markLength, centerY - R)
            ctx.lineTo(centerX + 2 * markLength, centerY - R)
            ctx.moveTo(centerX - 2 * markLength, centerY + R / 2)
            ctx.lineTo(centerX + 2 * markLength, centerY + R / 2)
            ctx.moveTo(centerX - 2 * markLength, centerY + R)
            ctx.lineTo(centerX + 2 * markLength, centerY + R)

            ctx.stroke()
        }

        function drawText() {
            const fontSize = 17
            ctx.fillStyle = '#000000'
            ctx.font = `${fontSize}px sans-serif`
            const textR2 = ctx.measureText('R/2')
            const textR = ctx.measureText('R')

            //x
            ctx.fillText('R/2', centerX + R / 2 - textR2.width / 2, centerY + 22)
            ctx.fillText('R', centerX + R - textR.width / 2, centerY + 22)
            ctx.fillText('R/2', centerX - R / 2 - textR2.width / 2, centerY + 22)
            ctx.fillText('R', centerX - R - textR.width / 2, centerY + 22)

            //y
            ctx.fillText('R/2', centerX + 12, centerY + R / 2 + fontSize / 2)
            ctx.fillText('R', centerX + 12, centerY + R + fontSize / 2)
            ctx.fillText('R/2', centerX + 12, centerY - R / 2 + fontSize / 2)
            ctx.fillText('R', centerX + 12, centerY - R + fontSize / 2)
        }

        function drawFigures() {
            ctx.fillStyle = 'rgba(134,97,157,0.5)'
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(centerX, centerY - R)
            ctx.lineTo(centerX + R / 2, centerY)
            ctx.lineTo(centerX + R / 2, centerY)
            ctx.fill()

            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(centerX + R, centerY)
            ctx.lineTo(centerX + R, centerY+R)
            ctx.lineTo(centerX, centerY + R)
            ctx.fill()

            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.arc(centerX, centerY, R/2, -1.55, Math.PI , true)
            ctx.fill()
        }

        drawAxes()
        drawMarks()
        drawFigures()
        drawText()
    }
}