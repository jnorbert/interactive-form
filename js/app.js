//Hide Your Job Role
const $otherTitle = $(
  '<input type="text" id="other-title" name="other" placeholder="Your Job Role">'
).hide();

//Focus on the Name field
$('#name').focus();

//Add input element after selected of Job Role
$('fieldset:first-of-type').append($otherTitle);

//Show above input after selected od other value in Job Role
$('#title').on('change', function() {
  if ($(this).val() === 'other') {
    $otherTitle.show();
  } else {
    $otherTitle.hide();
  }
});

//Display the color options that match the design selected in the "Design" menu
$('#colors-js-puns').hide();

$('#design').on('change', function() {
  if ($('#design option:selected').val() === 'js puns') {
    $('#colors-js-puns').show();
    $('#color').html(
      '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>'
    );
  } else if ($('#design option:selected').val() === 'heart js') {
    $('#colors-js-puns').show();
    $('#color').html(
      '<option value="tomato">Tomato (I &#9829; JS shirt only)</option>)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>'
    );
  } else {
    $('#colors-js-puns').hide();
  }
});

//Register for Activities
$(document).ready(function() {
  let ckbox_frameworks = $('input[name=js-frameworks]');
  let ckbox_libraries = $('input[name=js-libs]');
  let ckbox_express = $('input[name=express]');
  let ckbox_node = $('input[name=node]');

  $('input').on('click', function() {
    if (ckbox_frameworks.is(':checked')) {
      ckbox_express.prop('disabled', true);
    } else if (ckbox_express.is(':checked')) {
      ckbox_frameworks.prop('disabled', true);
    } else {
      ckbox_express.prop('disabled', false) &&
        ckbox_frameworks.prop('disabled', false);
    }

    if (ckbox_libraries.is(':checked')) {
      ckbox_node.prop('disabled', true);
    } else if (ckbox_node.is(':checked')) {
      ckbox_libraries.prop('disabled', true);
    } else {
      ckbox_node.prop('disabled', false) &&
        ckbox_libraries.prop('disabled', false);
    }
  });
});

//Cost of activities
$(':checkbox').change(function() {
  let cost = 0;
  $('#cost').remove();

  if ($(`input[name='all']`).is(':checked')) {
    cost += 200;
  }

  $(`.activities input:not([name='all'])`).each(function() {
    if ($(this).is(':checked')) {
      cost += 100;
    }
  });

  if (cost > 0) {
    let $totalCost = $(`<p id='cost'>Total cost: ${cost}</p>`);
    $('.activities').append($totalCost);
  }
});

//Payment info
const $paypal = $('#credit-card + div p');
const $bitcoin = $('#credit-card ~ div:nth-of-type(3)');
const $selectMethod = $('#payment [value="select_method"]');
$paypal.hide();
$bitcoin.hide();

//Display payment sections based on the payment option chosen in the select menu
$('#payment').on('change', function() {
  if ($('#payment option:selected').val() === 'paypal') {
    $($paypal).show();
    $($bitcoin).hide();
    $('#credit-card').hide();
  } else if ($('#payment option:selected').val() === 'bitcoin') {
    $($bitcoin).show();
    $($paypal).hide();
    $('#credit-card').hide();
  } else {
    $('#credit-card').show();
    $paypal.hide();
    $bitcoin.hide();
  }

  //After selected of payments method the select_method will be disabled
  if ($(this).val() === 'paypal' && 'bitcoin' && 'credit card') {
    $($selectMethod).prop('disabled', 'disabled');
  }
});

//Validation form
//Name field can't be blank
$(document).ready(function() {
  $('.container form').submit(function(e) {
    e.preventDefault();
    let name = $('#name').val();
    let email = $('#mail').val();
    let cc = $('#cc-num').val();
    let zipcode = $('#zip').val();
    let cvv = $('#cvv').val();
    let errorMessage = '<span class="error">This field is required</span>';

    $('.error').remove();
    if (name.length < 1) {
      $('#name').after(errorMessage);
    }

    //Email field can't be blank
    if (email.length < 1) {
      $('#mail').after(errorMessage);
    } else {
      let regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let validEmail = regEx.test(email);
      if (!validEmail) {
        $('#mail').after('<span class="error">Enter a valid email</span>');
      }
    }

    // Activities error
    if ($('.activities input[type=checkbox]:checked').length === 0) {
      $('fieldset.activities').after(errorMessage);
      event.preventDefault();
    } else {
      $('.error').remove();
    }

    //Credit card validation
    if (cc.length < 13) {
      $('#cc-num').after(errorMessage);
    } else if (cc.length > 16) {
      $('#cc-num').after('<span class="error">Enter a valid CC number</span>');
    }

    //Zip Code validation
    if (zipcode.length != 5) {
      $('#zip').after(errorMessage);
    }

    //CVV Code validation
    if (cvv.length != 3) {
      $('#cvv').after(errorMessage);
    }
  });
});
