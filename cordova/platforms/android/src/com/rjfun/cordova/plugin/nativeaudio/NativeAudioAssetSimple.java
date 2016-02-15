//
//
//  NativeAudioAssetComplex.java
//
//  Created by Sidney Bofah on 2014-06-26.
//

package com.rjfun.cordova.plugin.nativeaudio;

import android.content.res.AssetFileDescriptor;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.media.MediaPlayer.OnPreparedListener;
import android.media.SoundPool;
import android.os.Build;

import java.io.IOException;
import java.util.concurrent.Callable;

public class NativeAudioAssetSimple implements NativeAudioAsset.NativAudioAsset {
	final int MAX_STREAMS = 5;

    Callable<Void> completeCallback;
	protected SoundPool sp;
	protected int soundId;

	public NativeAudioAssetSimple(AssetFileDescriptor afd, float volume)  throws IOException
	{
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
			AudioAttributes attributes = new AudioAttributes.Builder()
					.setUsage(AudioAttributes.USAGE_GAME)
					.setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
					.build();
			this.sp = new SoundPool.Builder()
					.setAudioAttributes(attributes)
					.build();
		}else{
			this.sp = new SoundPool(5,AudioManager.STREAM_MUSIC,0);
		}

		this.soundId = this.sp.load(afd, 1);
	}
	
	public void play(Callable<Void> completeCb) throws IOException
	{
        this.completeCallback = completeCb;
		invokePlay(false);
	}
	
	private void invokePlay( Boolean loop )
	{
		int loopCount = 0;
		if(loop){
			loopCount = 99999999;
		}

		this.sp.play(this.soundId, 1, 1, 0, loopCount, 1);
		if(null != this.completeCallback){
			try {
				this.completeCallback.call();
			}catch(Exception e){
				e.printStackTrace();
			}
		}
	}

	public boolean pause()
	{
		try {
			this.sp.pause(this.soundId);
			return true;
		} catch (IllegalStateException e) {
			// I don't know why this gets thrown; catch here to save app
		}
		return false;
	}

	public void resume()
	{
		this.sp.resume(this.soundId);
	}

    public void stop()
	{
		try {
			this.sp.stop(this.soundId);
		}catch (IllegalStateException e) {
            // I don't know why this gets thrown; catch here to save app
		}
	}

	public void setVolume(float volume) 
	{
		try {
			this.sp.setVolume(this.soundId, volume, volume);
		}catch (IllegalStateException e){
			// I don't know why this gets thrown; catch here to save app
		}
	}
	
	public void loop() throws IOException {
		invokePlay( true );
	}
	
	public void unload() throws IOException
	{
		this.stop();
		this.sp.unload(this.soundId);
		this.sp.release();
	}

}
