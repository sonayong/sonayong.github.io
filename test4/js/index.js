///////////////////
///////////////////

function log(...args) {
  let message = args.join(' ');
  $('#log').prepend('--&gt; ' + message + '<br>');
}

function warn(...args) {
  log(...args);
  $('#log').addClass('warn');
}

function hideLog() {
  $('#log').hide();
}

function showLog() {
  $('#log').show();
}

function clearLog() {
  $('#log').empty();
}

window.onerror = error => {
  $('#log').addClass('error').text(`Error: ${error}`);
};

function checkSupportFor(name, propertyName, propertyOwner = window) {
  if (!(propertyName in propertyOwner)) {
    warn(`No support for ${name}`);
  } else {
    log(`Supports ${name}!`);
    return true;
  }
}

function isInIframe() {
  return window.parent !== window;
}

$(() => {
  log('Ready!');
  showLog();
  $('#clear-log').click(clearLog);
});

//////////////////
//////////////////

let currentState = {
  // device orientation
  beta: 0, // In degree in the range [-180,180]
  gamma: 0, // In degree in the range [-180,180]
  alpha: 0,
  absolute: 0,

  // devicemotion acceleration
  acceleration: {
    x: 0,
    y: 0,
    z: 0 },


  // devicemotion gravity-corrected acceleration
  accelerationIncludingGravity: {
    x: 0,
    y: 0,
    z: 0 },


  // devicemotion rotation
  rotationRate: {
    beta: 0,
    gamma: 0,
    alpha: 0 } };



function handleDeviceOrientation(event) {
  let propertyNames = ['alpha', 'beta', 'gamma', 'absolute'];

  propertyNames.forEach(propertyName => {
    currentState[propertyName] = event[propertyName];
  });

  displayState(currentState);
}

function handleDeviceMotion(event) {
  let propertyNames = ['x', 'y', 'z'];

  // acceleration
  propertyNames.forEach(propName => {
    if (event.accelerationIncludingGravity) {
      currentState.accelerationIncludingGravity[propName] = event.accelerationIncludingGravity[propName];
    }
    if (event.acceleration) {
      currentState.acceleration[propName] = event.acceleration[propName];
    }
  });

  // rotation
  propertyNames = ['alpha', 'beta', 'gamma'];
  propertyNames.forEach(propName => {
    if (event.rotationRate) {
      currentState.rotationRate[propName] = event.rotationRate[propName];
    }
  });

  displayState(currentState);
}

function displayState(state) {
  Object.keys(state).forEach(key => {
    let value = state[key];
    if (value === null) {return;}

    if (typeof value === 'object') {
      Object.keys(value).forEach(innerKey => {
        let innerValue = state[key][innerKey];
        if (innerValue === null) {return;}

        let elementId = `${key}-${innerKey}`;
        $('#' + elementId).text(Math.round(innerValue));
      });
    } else {
      let elementId = key;
      $('#' + elementId).text(Math.round(value));
    }
  });

  updateDemo(state);
}

function updateDemo(state) {
  let x = state.gamma,
  y = state.beta,
  rotation = state.alpha;

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x > 90) {x = 90;};
  if (x < -90) {x = -90;};

  // To make computation easier we shift the range of 
  // x and y to [0,180]
  x += 90;
  y += 90;

  let xPct = 100 * x / 180,
  yPct = 100 * y / 180;

  // reverse the rotation
  rotation = -1 * rotation;

  let width = 10,height = 10;

  $('#item').css({
    left: xPct - width + '%',
    top: yPct - height + '%',
    transform: 'rotate(' + rotation + 'deg)' });

}

$(() => {
  displayState(currentState);

  if (isInIframe()) {
    warn('This page appears to be running in an iframe and may no work');
  }
  if (checkSupportFor('Device Motion', 'ondevicemotion')) {
    log('add devicemotion handler');
    window.addEventListener('devicemotion', handleDeviceMotion);
  }
  if (checkSupportFor('Device Orientation', 'ondeviceorientation')) {
    log('add deviceorientation handler');
    window.addEventListener('deviceorientation', handleDeviceOrientation);
  }
});