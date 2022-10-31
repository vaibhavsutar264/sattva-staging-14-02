const live = () => {

    return (
<div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '210vh'}}>
    <h2>EnableX Livestream</h2>
<iframe height={500} width={800}
                    allow="camera;  microphone; fullscreen; speaker; display-capture"
                    src="https://sattvaconnect.yourvideo.live/host/NjI0MmVjN2I1YTI4MDkyOWY4NDZjMjJjLTYyNDJkYTJlNTdkZDg0MjA3NjI4YTlkNw==" >
                    </iframe>

                    <h2 style={{marginTop: '100px'}}>EnableX Livestream Participants</h2>
<iframe height={500} width={800}
 allow="camera; microphone; fullscreen; speaker; display-capture"
src="https://sattvaconnect.yourvideo.live/6242ec7b5a280929f846c22c">
</iframe>

</div>
    );

}

export default live;