//
//
//  NativeAudioAsset.java
//
//  Created by Sidney Bofah on 2014-06-26.
//

package com.rjfun.cordova.plugin.nativeaudio;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.Callable;

import android.content.res.AssetFileDescriptor;

public class NativeAudioAsset
{

	private ArrayList<NativAudioAsset> voices;
	private int playIndex = 0;
	private String preloadType;
	
	public NativeAudioAsset(AssetFileDescriptor afd, int numVoices, float volume, String preloadType) throws IOException
	{
		this.preloadType = preloadType;
		voices = new ArrayList<NativAudioAsset>();
		
		if ( numVoices < 0 )
			numVoices = 1;
		
		for ( int x=0; x<numVoices; x++) 
		{
			NativAudioAsset voice = preloadType.contains(NativeAudio.PRELOAD_SIMPLE) ?  new NativeAudioAssetSimple(afd, volume) : new NativeAudioAssetComplex(afd, volume);
			voices.add( voice );
		}
	}
	
	public void play(Callable<Void> completeCb) throws IOException
	{
		NativAudioAsset voice = voices.get(playIndex);
		voice.play(completeCb);
		playIndex++;
		playIndex = playIndex % voices.size();
	}

	public boolean pause()
	{
		boolean wasPlaying = false;
		for ( int x=0; x<voices.size(); x++)
		{
			NativAudioAsset voice = voices.get(x);
				wasPlaying |= voice.pause();
		}
		return wasPlaying;
	}

	public void resume()
	{
		// only resumes first instance, assume being used on a stream and not multiple sfx
		if (voices.size() > 0)
		{
			NativAudioAsset voice = voices.get(0);
			voice.resume();
		}
	}

    public void stop()
	{
		for ( int x=0; x<voices.size(); x++) 
		{
			NativAudioAsset voice = voices.get(x);
			voice.stop();
		}
	}
	
	public void loop() throws IOException
	{
		NativAudioAsset voice = voices.get(playIndex);
		voice.loop();
		playIndex++;
		playIndex = playIndex % voices.size();
	}
	
	public void unload() throws IOException
	{
		this.stop();
		for ( int x=0; x<voices.size(); x++) 
		{
			NativAudioAsset voice = voices.get(x);
			voice.unload();
		}
		voices.removeAll(voices);
	}
	
	public void setVolume(float volume)
	{
		for (int x = 0; x < voices.size(); x++)
		{
			NativAudioAsset voice = voices.get(x);
			voice.setVolume(volume);
		}
	}


	public interface NativAudioAsset
	{
		public void play(Callable<Void> completeCb) throws IOException;
		public boolean pause();
		public void resume();
		public void stop();
		public void setVolume(float volume);
		public void loop()  throws IOException;
		public void unload() throws IOException;
	}
}