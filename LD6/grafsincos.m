function [varargout] = grafsincos(x)

out_sin = sin(x);
out_cos = cos(x);

if nargout
        varargout = {out_sin; out_cos};

else
    subplot(2,1,1);
    plot(x, out_sin);
    subplot(2,1,2);
    plot(x, out_cos);
end
end