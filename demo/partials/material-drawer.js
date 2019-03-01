export const template = `<h1>material-drawer</h1>
<p>
    The navigation drawer slides in from the left and contains the navigation destinations for your app.
</p>

<h3>Usage</h3>
<pre>
    &lt;material-drawer&gt;
        &lt;material-slidemenu label="Languages" slot="content"&gt;
            &lt;a slot="item" href="#"&gt;Javascript&lt;/a&gt;
            &lt;a slot="item" href="#"&gt;PHP&lt;/a&gt;
            &lt;a slot="item" href="#"&gt;Typescript&lt;/a&gt;
            &lt;a slot="item" href="#"&gt;Scala&lt;/a&gt;
        &lt;/material-slidemenu&gt;
    &lt;/material-drawer&gt;
</pre>

<h3>Attributes</h3>
<ul>
    <li><code>open</code>: empty, when present the drawer will appear open</li>
</ul>

<h3>Styling</h3>
<ul>
    <li><code>--drawer-color</code>: color of the drawer, default: #ffffff</li>
</ul>

<section class="demo">
    <h3>Demo</h3>
    <material-button label="Toggle" id="material-drawer-toggle" raised></material-button>

    <material-drawer id="demo-material-drawer">
        <p slot="content">Click languages</p>
        <material-slidemenu label="Languages" slot="content">
            <a slot="item" href="#">Javascript</a>
            <a slot="item" href="#">PHP</a>
            <a slot="item" href="#">Typescript</a>
            <a slot="item" href="#">Scala</a>
        </material-slidemenu>
    </material-drawer>
</section>
`;